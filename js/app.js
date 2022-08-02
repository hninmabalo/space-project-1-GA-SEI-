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
// let alien;
let bullet;

window.addEventListener("DOMContentLoaded", function() {
    astronaut = new Player(20, 80, playerimg, 50, 70);
    // alien = new Opponents(650, 200, enemyimg, 60, 80);

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



let arrayAlien = [];
class Opponents {
    constructor() {
        this.width = 70;
        this.height = 70;
        this.x = game.width;
        this.y = Math.random() * (game.height - this.height);
        this.distancesX = Math.random() * 5 + 3;
        this.distancesY = Math.random() * 5 - 2.5;
    }
    update() {
        this.x -= this.distancesX;
    }
    draw() {
        ctx.drawImage(alienimg, this.x, this.y, this.width, this.height);
    }
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

const alien = new Opponents();

function gameLoop(timestamp) {
    ctx.clearRect(0, 0, game.width, game.height);
    alien.update();
    alien.draw();
        // if (alien.alive) {
    //     alien.render()
    //     let hit = detectHit (astronaut, alien);
    // }
    astronaut.render();
    
     
}




// function addNewAlien() {

//     alien.alive = false;
//     setTimeout(function() {
//         let x = Math.floor (Math.random() * game.width) - 40;
//         let y = Math.floor (Math.random() * game.height) - 40;
//         alien = new Player(x, y, enemyimg, 60, 80);
//     }, 1000);
//     return true;
// }


function detectHit(player1, player2) {
    let hitTest = 
        player1.y + player1.height > player2.y && 
        player1.y < player2.y + player2.height &&
        player1.x + player1.width > player2.x &&
        player1.x < player2.x + player2.width; 

    if (hitTest) {
        let newScore = Number(score.textContent) + 10;
        score.textContent = newScore;
        // return addNewAlien();
        alien.alive = false;
//     } else {
//         return false;
    }
}
