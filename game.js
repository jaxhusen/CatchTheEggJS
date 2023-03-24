window.addEventListener('resize', () => {
    window.location.reload()
}); //update size of game depending on size of screen
document.addEventListener('keydown', controlKeys);
document.addEventListener('mousemove', moveBasketWithPointer);

var game = document.querySelector(".game");
var basket = document.querySelector(".basket");
var fruits = document.querySelector(".fruits");
var enemies = document.querySelector(".enemies");
var body = document.querySelector(".body");
var onePoint = document.querySelector(".onePoint");


var startGameButton = document.querySelector(".startGame");
var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
var basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));



//change physics of the image (basket)
const basketUrl = "bag.png";
const basketWidth = 100;
const basketHeight = 150;
basket.style.backgroundImage = `url(${basketUrl})`;
basket.style.width = basketWidth + 'px';
basket.style.height = basketHeight + 'px';
basket.style.backgroundPosition = "top center";
basket.style.backgroundSize = "100%";
basket.style.backgroundRepeat = "no-repeat";


//change physics of the image (egg)
const eggUrl = "egg.png";
const eggWidth = 40;
const eggHeight = 40;
/* fruits.style.backgroundImage = `url(${eggUrl})`;
fruits.style.width = eggWidth + 'px';
fruits.style.height = eggHeight + 'px';
fruits.style.backgroundPosition = "top center";
fruits.style.backgroundSize = "100%";
fruits.style.backgroundRepeat = "no-repeat"; */
/* fruits.style.display = "none"; */


//variables for generateFruits()
var easyIntervalSpeed = 12;
var mediumIntervalSpeed = easyIntervalSpeed / 2;
var hardIntervalSpeed = easyIntervalSpeed / 4;
var setIntervalSpeed = easyIntervalSpeed;            //how fast the egg will fall

var easyTimeoutSpeed = 2000;
var mediumTimeoutSpeed = easyTimeoutSpeed / 2;
var hardTimeoutSpeed = easyTimeoutSpeed / 4;
var setTimeoutSpeed = easyTimeoutSpeed;             //how often the function will run (render a new egg)

var fruitDivs = [];
var loopCount = 0;
const restartLoopCount = 0;
// counter for tracking fruit drops

var fruitInterval;
var fruitTimeout;



//variables for generateEnemies()
const livesAfterCollideWithEnemy = 0;
var enemyDivs = [];
var enemyLoopCount = 0;


var easyEnemyIntervalSpeed = 10;
var mediumEnemyIntervalSpeed = easyEnemyIntervalSpeed / 2;
var hardEnemyIntervalSpeed = easyEnemyIntervalSpeed / 2;
var setEnemyIntervalSpeed = easyEnemyIntervalSpeed;              //how fast the egg will fall

var easyEnemyTimeoutSpeed = 1700;
var mediumEnemyTimeoutSpeed = easyEnemyTimeoutSpeed / 2;
var hardEnemyTimeoutSpeed = easyEnemyTimeoutSpeed / 2;
var setEnemyTimeoutSpeed = easyEnemyTimeoutSpeed;             //how often the function will run (render a new egg)

var enemyInterval;
var enemyTimeout;


const scoreToWin = 20;
const scoreToMedium = 5;
const scoreToHard = 10;
const increseScoreCount = 1;
const decreaseScoreCount = 1;

var score = 0;
var lives = 3;
const restartScore = score;
const restartLives = lives;
var scoreText = document.getElementById("scoreText");
var livesText = document.getElementById("livesText");

const gameWidth = window.innerWidth - 10;
const gameHeight = window.innerHeight - 50;
const playWidth = gameWidth - eggWidth;
game.style.width = gameWidth + 'px';
game.style.height = gameHeight + 'px';
/* body.style.width = gameWidth + 'px';
body.style.height = gameHeight + 'px'; */


var gameStarted = false;
var basketStartPos = gameWidth / 2 - basketWidth / 2;


// Calculate the left position of the onePoint element
const totalBasketWidth = basket.offsetWidth;
const basketLeftOffset = basket.offsetLeft;

var onePointWidth = onePoint.offsetWidth;


function moveBasketWithPointer(e) {
    if (!gameStarted) {
        return;
    } else {
        // Calculate the new position of the basket based on the position of the mouse
        var mouseX = e.clientX;
        var basketNewPos = mouseX - basketWidth / 2;
        // Make sure the basket stays within the game boundaries
        if (basketNewPos < 0) {
            basketNewPos = 0;
        }
        if (basketNewPos > gameWidth - basketWidth) {
            basketNewPos = gameWidth - basketWidth;
        }
        // Move the basket
        basket.style.left = basketNewPos + 'px';
        basketLeft = basketNewPos;
    }
}


function moveBasketLeft() {
    if (!gameStarted) {
        return; // Disable key moves until game has started
    } else {
        if (basketLeft > 0) {
            basketLeft -= basketWidth / 2;
            basket.style.left = basketLeft + 'px';
        }
    }
}

scoreText.innerHTML = 'Score: ' + `${score}`;
livesText.innerHTML = 'Lives: ' + `${lives}`;

function moveBasketRight() {
    if (!gameStarted) {
        return; // Disable key moves until game has started
    } else {
        if (basketLeft < gameWidth - basketWidth) {
            basketLeft += basketWidth / 2;
            basket.style.left = basketLeft + 'px';
        }
    }
}


function startGame() {
    gameStarted = true;
    basket.classList.remove("catch-enemy-animation");

    score = restartScore;
    lives = restartLives;
    loopCount = restartLoopCount;

    setIntervalSpeed = easyIntervalSpeed;
    setTimeoutSpeed = easyTimeoutSpeed;

    setEnemyIntervalSpeed = easyEnemyIntervalSpeed;
    setEnemyTimeoutSpeed = easyEnemyTimeoutSpeed;

    scoreText.innerHTML = 'Score: ' + `${score}`;
    livesText.innerHTML = 'Lives: ' + `${lives}`;

    // remove all existing fruits
    while (fruits.firstChild) {
        fruits.removeChild(fruits.firstChild);
    }
    fruitDivs.splice(0, fruitDivs.length);

    // remove all existing enemies
    while (enemies.firstChild) {
        enemies.removeChild(enemies.firstChild);
    }
    enemyDivs.splice(0, enemyDivs.length);

    generateFruits();
    generateEnemies();
}



function controlKeys(e) {
    if (e.key == "ArrowLeft") {
        moveBasketLeft();
    }
    if (e.key == "ArrowRight") {
        moveBasketRight();
    }
}

function generateEnemies() {
    startGameButton.style.display = "none";

    var enemyBottom = gameHeight - eggHeight;
    var enemyLeft = Math.floor(Math.random() * (innerWidth - basketWidth)) + basketWidth / 2;
    var enemyDiv = document.createElement('div');
    enemyDiv.setAttribute("class", "enemy");
    enemies.appendChild(enemyDiv);
    enemyDivs.push(enemyDiv);

    var indexEnemy = enemyDivs.indexOf(enemyDiv);
    enemyLoopCount += increseScoreCount;
    console.log('enemies', enemyLoopCount)

    function enemyfallDown() {
        if (enemyBottom < basketBottom + basketHeight && enemyBottom > basketBottom && enemyLeft > basketLeft - eggWidth && enemyLeft < basketLeft + basketWidth) {
            if (enemyDiv.parentNode === enemies) {
                enemies.removeChild(enemyDiv);
            }
            enemyDivs.splice(indexEnemy, 1);

            clearInterval(enemyInterval);
            clearTimeout(enemyTimeout);
            clearInterval(fruitInterval);
            clearInterval(fruitTimeout);

            lives = livesAfterCollideWithEnemy;
            livesText.innerHTML = 'Lives: ' + `${lives}`;

            gameStarted = false;
            startGameButton.style.display = "flex";

            basket.classList.add('catch-enemy-animation');

            // remove all existing enemies
            while (enemies.firstChild) {
                enemies.removeChild(enemies.firstChild);
            }
            enemyDivs.splice(0, enemyDivs.length);

        }
        if (enemyBottom < basketBottom && lives > 0 && enemyDiv.parentNode === enemies) {
            enemies.removeChild(enemyDiv);
            enemyDivs.splice(indexEnemy, 1);
        }

        enemyBottom -= 5;
        enemyDiv.style.bottom = enemyBottom + 'px';
        enemyDiv.style.left = enemyLeft + 'px';
    }
    enemyInterval = setInterval(enemyfallDown, setEnemyIntervalSpeed);
    enemyTimeout = setTimeout(generateEnemies, setEnemyTimeoutSpeed);
}



function generateFruits() {
    startGameButton.style.display = "none";

    var fruitBottom = gameHeight - eggHeight;
    var fruitLeft = Math.floor(Math.random() * (innerWidth - basketWidth)) + basketWidth / 2;
    var fruitDiv = document.createElement('div');
    fruitDiv.setAttribute("class", "fruit");
    fruits.appendChild(fruitDiv);
    fruitDivs.push(fruitDiv);

    var index = fruitDivs.indexOf(fruitDiv);
    loopCount += increseScoreCount;
    console.log('fruits:', loopCount)

    if (loopCount % 2 == 0) {
        // change the angle of the fruit
        fruitDiv.style.transform = 'rotate(' + (Math.random() * 120 - 50) + 'deg)';
    }

    function fruitfallDown() {
        if (fruitBottom < basketBottom + basketHeight && fruitBottom > basketBottom && fruitLeft > basketLeft - eggWidth && fruitLeft < basketLeft + basketWidth) {
            if (fruitDiv.parentNode === fruits) {
                fruits.removeChild(fruitDiv);
            }
            fruitDivs.splice(index, 1);

            clearInterval(fruitInterval);

            score += increseScoreCount;
            scoreText.innerHTML = 'Score: ' + `${score}`;

            basket.classList.add('catch-animation');
            onePoint.classList.add('slide-out-top');
''
            onePoint.innerText = "+1";
            //onePoint.style.opacity = '1';
            


            setTimeout(() => {
                //onePoint.style.opacity = '0';
                basket.classList.remove('catch-animation');
                onePoint.classList.remove('slide-out-top');
                onePoint.innerText = "";
            }, 500);




            if (score == scoreToMedium) {
                // Increase setIntervalSpeed
                setIntervalSpeed = mediumIntervalSpeed;
                setTimeoutSpeed = mediumTimeoutSpeed;

                setEnemyIntervalSpeed = mediumEnemyIntervalSpeed;
                setEnemyTimeoutSpeed = mediumEnemyTimeoutSpeed;
            }
            if (score == scoreToHard) {
                // Increase setIntervalSpeed
                setIntervalSpeed = hardIntervalSpeed;
                setTimeoutSpeed = hardTimeoutSpeed;

                setEnemyIntervalSpeed = hardEnemyIntervalSpeed;
                setEnemyTimeoutSpeed = hardEnemyTimeoutSpeed;
            }
            if (score >= scoreToWin) {
                clearInterval(enemyInterval);
                clearTimeout(enemyTimeout);
                clearInterval(fruitInterval);
                clearInterval(fruitTimeout);

                console.log("YOU WINNNN")
                gameStarted = false;
                startGameButton.style.display = "flex";

                // remove all existing fruits
                while (fruits.firstChild) {
                    fruits.removeChild(fruits.firstChild);
                }
                fruitDivs.splice(0, fruitDivs.length);
            }
        }


        if (fruitBottom < basketBottom && lives > 0 && fruitDiv.parentNode === fruits) {
            lives -= decreaseScoreCount;
            livesText.innerHTML = 'Lives: ' + `${lives}`;
            fruits.removeChild(fruitDiv);
            fruitDivs.splice(index, 1);
        }


        if (lives == 0) {
            clearInterval(enemyInterval);
            clearTimeout(enemyTimeout);
            clearInterval(fruitInterval);
            clearInterval(fruitTimeout);

            while (fruits.firstChild) {
                fruits.removeChild(fruits.firstChild);
            }
            fruitDivs.splice(0, fruitDivs.length);

            // remove all existing enemies
            while (enemies.firstChild) {
                enemies.removeChild(enemies.firstChild);
            }
            enemyDivs.splice(0, enemyDivs.length);

            gameStarted = false;
            startGameButton.style.display = "flex";
            startGameButton.value = "Restart Game";
            startGameButton.onclick;
        }

        fruitBottom -= 5;
        fruitDiv.style.bottom = fruitBottom + 'px';
        fruitDiv.style.left = fruitLeft + 'px';
    }

    fruitInterval = setInterval(fruitfallDown, setIntervalSpeed);
    fruitTimeout = setTimeout(generateFruits, setTimeoutSpeed);
}