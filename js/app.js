console.log("space");

const game = document.getElementById("game");
const score = document.getElementById("score");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const movement = document.getElementById("movement");

const ctx = game.getContext("2d");
let astronaut;
let monster;
let crystal;


game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);



window.addEventListener("DOMContentLoaded", function() {
    astronaut = new Character(40, 250, "grey", 40, 80);
    monster = new Character(120, 90, "green", 40, 50);

    const runGame = setInterval(gameLoop, 60);
});

document.addEventListener("keydown", movementHander);

class Character {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
} 


function addNewMonster() {
    setTimeout(function() {
        let x = Math.floor(Math.random() * game.width) - 40;
        let y = Math.floor(Math.random() * game.height) - 80;
        monster = new Character(x, y, "green", 40, 50);
    }, 500);
    return true;
}

function movementHander(e) {
    console.log("movement", e.key);

    switch(e.key) {
        case "ArrowUp":
            astronaut.y - 30 >= 0 ? (astronaut.y -= 10) : null;
            break;
        case "ArrowLeft":
            astronaut.x - 1 >= 0 ? (astronaut.x -= 10) : null;
            break;
        case "ArrowDown":
            astronaut.y + 10 <= game.height ? (astronaut.y += 10) : null;
            break;
        case "ArrowRight":
            astronaut.x + 10 <= game.width ? (astronaut.x += 10) : null;
            break;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    
    if (monster.alive) {
        monster.render();

        let hit = detectHit(astronaut, monster);
    }
    astronaut.render();

}




function detectHit(player1, player2) {
    let hitTest = 
        player1.y + player1.height > player2.y && 
        player1.y < player2.y + player2.height &&
        player1.x + player1.width > player2.x &&
        player1.x < player2.x + player2.width; 

    if (hitTest) {
        let newScore = `Score: ${Number(score.textContent) + 10}`;
        score.textContent = newScore;

        return addNewMonster();
    } else {
        return false;
    }
}

 start.addEventListener('click', function() {
     start.gameloop();
  });