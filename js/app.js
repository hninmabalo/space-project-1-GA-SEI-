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
    // alien = new Opponents(650, 200, enemyimg, 60, 80);
    alien = new Opponents();
    
    const runGame = setInterval(gameLoop, 60);
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
} 

    
// class Opponents {
//     constructor(x, y, image, width, height) {
//         this.x = x;
//         this.y = y;
//         this.image = image;
//         this.width = width;
//         this.height = height;
//         this.speed = 1.5;
//         this.alive = true;

//         this.render = function() {
//             ctx.drawImage(this.image, this.x -= this.speed, this.y, this.width, this.height);
//         }
    
//     }
// }


let numberOfAlien = 50;
let arrayAlien = [];

class Opponents {
    constructor() {
        this.width = 70;
        this.height = 70;
        this.x = game.width;
        this.y = Math.random() * game.height;
        this.speed = Math.random() * 4 - 2;
        this.distancesX = Math.random() * 5 + 1;
        // this.distancesY = Math.random() * 3 - 1;
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
}


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

        // case "w":
        //     alien.y - 30 >= 0 ? (alien.y -= 10) : null;
        //     break;
        // case "a":
        //     alien.x - 10 >= 0 ? (alien.x -= 10) : null;
        //     break;
        // case "s":
        //     alien.y + 10 <= game.height ? (alien.y += 10) : null;
        //     break;
        // case "d":
        //     alien.x + 10 <= game.width ? (alien.x += 10) : null;
        //     break;
        
    }
}

// const alien = new Opponents();

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);

    arrayAlien.forEach( alien => {
        alien.update();
        alien.draw();
    });
    if (astronaut.alive) {
        let hit = detectHit();
    }

   astronaut.render();
}  





// function addNewAlien() {

//     alien.alive = false;
//     setTimeout(function() {
//         let x = Math.floor (Math.random() * game.width) - 40;
//         let y = Math.floor (Math.random() * game.height) - 40;
//         alien = new Opponents();
//     }, 1000);
//     return true;
// }


// function detectHit(player1, player2) {
//     let hitTest = 
//         player1.y + player1.height > player2.y && 
//         player1.y < player2.y + player2.height &&
//         player1.x + player1.width > player2.x &&
//         player1.x < player2.x + player2.width; 

    function detectHit() {
        for(i = 0; i < arrayAlien.length; i++) {
            if( astronaut.x < arrayAlien[i].x + arrayAlien[i].width &&
                astronaut.x + astronaut.width > arrayAlien[i].x &&
                astronaut.y < arrayAlien[i].y + arrayAlien[i].height &&
                astronaut.y + astronaut.height > arrayAlien[i].y) {
                arrayAlien.splice(i ,1)
            
                let newScore = Number(score.textContent) + 10;
                score.textContent = newScore;
                alien.alive = false;
              } 
            } 
    
        }

    // if (hitTest) {
    //     let newScore = Number(score.textContent) + 10;
    //     score.textContent = newScore;
    //     // return addNewAlien();
    //     alien.alive = false;
    // } else {
    //     return false;
    // }
