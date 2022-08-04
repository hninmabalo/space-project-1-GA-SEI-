console.log("Space");

//game setup
const game = document.getElementById("game");
const score = document.getElementById("score");
const health = document.getElementById("health");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const movement = document.getElementById("movement");
const playerimg = document.getElementById("playerimg");
const alienimg = document.getElementById("alienimg");
const bulletimg = document.getElementById("bulletimg");

const ctx = game.getContext("2d"); // 2-dimensional canvas will display
let astronaut;
let alien;


window.addEventListener("DOMContentLoaded", function() {
    astronaut = new Player(20, 80, playerimg, 50, 70);
    alien = new Opponents();
    
    const runGame = setInterval(gameLoop, 80);
});


document.addEventListener("keydown", movementHander);

game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);


class Player {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.alive = true;
        

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
};


let numberOfAlien = 80;
let arrayAlien = [];

class Opponents {
    constructor() {
        this.width = 70;
        this.height = 70;
        this.x = game.width;
        this.y = Math.random() * game.height;
        this.speed = Math.random() * 4 - 1;
        this.distancesX = Math.random() * 5 + 3;
        this.distancesY = Math.random() * 5 - 2.5;
        this.alive = true;
        this.counted = false;
    }
    update() {
        this.x -= this.distancesX;
        this.x += this.speed;
        this.y += this.speed;
        if (this.x + this.width < 0) {
            this.x = game.width;
        }
        
    }
    draw() {
        ctx.drawImage(alienimg, this.x, this.y, this.width, this.height);
    }
}
for (let i = 0; i < numberOfAlien; i++) {
    arrayAlien.push(new Opponents());
};


function movementHander(e) {
    console.log("movement", e.key);

    switch(e.key) {
        case "ArrowUp":
            astronaut.y - 30 >= 0 ? (astronaut.y -= 10) : null;
            break;
        case "ArrowLeft":
            astronaut.x - 10 >= 0 ? (astronaut.x -= 10) : null;
            break;
        case "ArrowDown":
            astronaut.y + 10 <= game.height ? (astronaut.y += 10) : null;
            break;
        case "ArrowRight":
            astronaut.x + 10 <= game.width ? (astronaut.x += 10) : null;
            break;
        
    }
};

//game processes
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);

    arrayAlien.forEach( alien => {
        alien.update();
        alien.draw();
        // console.log(arrayAlien);
    });
    if (alien.alive) {
        
        let hit = detectHit();
    }

   astronaut.render();
};

//collision detection
    function detectHit() {
        for(i = 0; i < arrayAlien.length; i++) {
            if( astronaut.x < arrayAlien[i].x + arrayAlien[i].width &&
                astronaut.x + astronaut.width > arrayAlien[i].x &&
                astronaut.y < arrayAlien[i].y + arrayAlien[i].height &&
                astronaut.y + astronaut.height > arrayAlien[i].y) {
                arrayAlien.splice(i ,1)
                console.log('hit the alien'); //test the collision 
                
                if (!arrayAlien[i].counted) {
                let newScore = Number(score.textContent) + 1; //add 1 point when you hit each alien
                score.textContent = newScore;
                arrayAlien[i].counted = true;
                arrayAlien.splice(i, 1);
                }
              } 
            } 
    
        };