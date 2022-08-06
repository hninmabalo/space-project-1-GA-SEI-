console.log("Space"); //checking to see js file works 

// game setup
const game = document.getElementById("game");
const score = document.getElementById("score");
const health = document.getElementById("health");
const start = document.getElementById("start");
const movement = document.getElementById("movement");
const playerimg = document.getElementById("playerimg");
const alienimg = document.getElementById("alienimg");
const asteroidimg = document.getElementById("asteroidimg");
const gameOver = document.getElementById("container");


const ctx = game.getContext("2d"); // ctx = context // 2-dimensional canvas will display
let astronaut; // character in the game
let alien;  // character in the game
let asteroid;  // character in the game

let gameScore = 0; //set game score variable 
let playerHealth = 3; //set health variable 

//============================ Event Listeners =====================//

window.addEventListener("DOMContentLoaded", function() {
    astronaut = new Player(50, 150, playerimg, 60, 70);
    alien = new Opponents(alienimg, 60, 70);
    asteroid = new Opponents(asteroidimg, 50, 50);
   

    const runGame = setInterval(gameLoop, 60);
});


document.addEventListener("keydown", movementHander);

// start game button
start.addEventListener("click", function() {
    spawnOpponents();
    gameLoop();
  });

//================================================================//

game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);

// creating astronaut 
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

// creating alien and asteroid array
let arrayAlien = [];
let arrayAsteroid = [];

class Opponents {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.x = game.width;
        this.y = Math.random() * game.height;
        this.speed = Math.random();
        this.distancesX = Math.random() * 5 + 3;
        this.distancesY = Math.random() * 5 - 2.5;
        this.alive = true;
    }
    update() {
        this.x -= this.distancesX;
        this.x += this.speed;
        this.y += this.speed;   
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
};

// spawning alien and asteroid
function spawnOpponents() {
    setInterval(() => {
        arrayAlien.push(new Opponents(alienimg, 60, 70))
    }, 750); // alien will appear more often than asteroid by using different interval time 
    setInterval(() => {
        arrayAsteroid.push(new Opponents(asteroidimg, 50, 50))
    }, 1750);
};


// controling astronaut by using 'arrow' keys
function movementHander(e) {
    console.log("movement", e.key); // 'e' represents keydown

    switch(e.key) {
        case "ArrowUp":
            //move the astronaut up
            astronaut.y - 30 >= 0 ? (astronaut.y -= 10) : null;
            break;
        case "ArrowLeft":
            //move the astronaut left
            astronaut.x - 10 >= 0 ? (astronaut.x -= 10) : null;
            break;
        case "ArrowDown":
            //move the astronaut down
            astronaut.y + 10 <= game.height ? (astronaut.y += 10) : null;
            break;
        case "ArrowRight":
            //move the astronaut right
            astronaut.x + 10 <= game.width ? (astronaut.x += 10) : null;
            break;
        
    }
};

// game processes
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);

    arrayAlien.forEach( alien => {
        alien.update();
        alien.draw();
        // console.log(arrayAlien);
    });

    arrayAsteroid.forEach( asteroid => {
        asteroid.update();
        asteroid.draw();
        // console.log(arrayAsteroid);
    });

    
    if (astronaut.alive) {
    alienHit();
    asteroidHit();
    } else {
        return false;
    }

   astronaut.render();

   gameLose();

};

// collision detection for hitting alien
    function alienHit() {
        for(let i = 0; i < arrayAlien.length; i++) {
        
            if( astronaut.x < arrayAlien[i].x + arrayAlien[i].width &&
                astronaut.x + asteroid.width > arrayAlien[i].x &&
                astronaut.y < arrayAlien[i].y + arrayAlien[i].height &&
                astronaut.y + astronaut.height > arrayAlien[i].y) {
                arrayAlien.splice(i ,1)
                console.log('hit the alien'); //test the collision 
                
                if (arrayAlien[i]) {
                let newScore = gameScore += 1; //add points when astronaut hit alien
                score.textContent = `${newScore}`;
                arrayAlien.splice(i, 1);
                }
              } 
            } 
    
        };

// creating different function for hitting asteroid
    function asteroidHit() {
        for(let i = 0; i < arrayAsteroid.length; i++) {
            if( astronaut.x < arrayAsteroid[i].x + arrayAsteroid[i].width &&
                astronaut.x + astronaut.width > arrayAsteroid[i].x &&
                astronaut.y < arrayAsteroid[i].y + arrayAsteroid[i].height &&
                astronaut.y + astronaut.height > arrayAsteroid[i].y) {
                arrayAsteroid.splice(i ,1)
                console.log('hit the asteroid'); //test the collision 
                
                if (arrayAsteroid[i]) {
                let newHealth = playerHealth -= 1; //subtract points when astronaut hit asteroid
                health.textContent = `${newHealth}`;
                arrayAsteroid.splice(i, 1);
                
                }
              } 
            } 
    
        };

//GameOver and reset the page to play again
function gameLose() {
    if (playerHealth < 1) {
        console.log("Game Over");
        game.remove();
        astronaut.alive = false;

    gameOver.textContent = `GAME OVER! Your Best Score is ${gameScore}! Click here to play again!`;
    gameOver.style.fontSize = "x-large";
    gameOver.style.cursor = "pointer";

    gameOver.addEventListener("click", function() {
        location.reload();
    })
    }
};



      
  