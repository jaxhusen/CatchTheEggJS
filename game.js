var game = document.querySelector(".game");
var basket = document.querySelector(".basket");
var fruits = document.querySelector(".fruits");
var enemies = document.querySelector(".enemies");

var startGameButton = document.querySelector(".startGame");
var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
var basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));


//change physics of the image (basket)
const basketUrl = "basket.png";
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
var setIntervalSpeed = easyIntervalSpeed;              //how fast the egg will fall

var easyTimeoutSpeed = 2000;
var mediumTimeoutSpeed = easyTimeoutSpeed / 2;
var hardTimeoutSpeed = easyTimeoutSpeed / 4;
var setTimeoutSpeed = easyTimeoutSpeed;             //how often the function will run (render a new egg)

var fruitDivs = [];
var loopCount = 0;
const restartLoopCount = 0;

var fruitInterval;
var fruitTimeout;




//variables for generateEnemies
const livesAfterCollideWithEnemy = 0;
var enemyDivs = [];
var enemyLoopCount = 0;

var setEasyEnemyIntervalSpeed = 12;
var setEasyEnemyTimeoutSpeed = 2000;
var enemyInterval;
var enemyTimeout;





var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

const scoreToWin = 20;
const scoreToMedium = 5;
const scoreToHard = 10;
var score = 0;
var lives = 3;
const restartScore = score;
const restartLives = lives;
var scoreText = document.getElementById("scoreText");
var livesText = document.getElementById("livesText");



var gameStarted = false;
var basketStartPos = gameWidth / 2 - basketWidth / 2;


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

    score = restartScore;
    lives = restartLives;
    loopCount = restartLoopCount;

    setIntervalSpeed = easyIntervalSpeed;
    setTimeoutSpeed = easyTimeoutSpeed;

    scoreText.innerHTML = 'Score: ' + `${score}`;
    livesText.innerHTML = 'Lives: ' + `${lives}`;

    // remove all existing fruits
    while (fruits.firstChild) {
        fruits.removeChild(fruits.firstChild);
    }
    fruitDivs.splice(0, fruitDivs.length);

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
    var enemyLeft = Math.floor(Math.random() * (gameWidth - eggWidth * 2)) + eggWidth; // set the left position with a restriction of 40 pixels on both edges
    var enemyDiv = document.createElement('div');
    enemyDiv.setAttribute("class", "enemy");
    enemies.appendChild(enemyDiv);
    enemyDivs.push(enemyDiv);

    var indexEnemy = enemyDivs.indexOf(enemyDiv);
    enemyLoopCount += 1;
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

            score = livesAfterCollideWithEnemy;
            scoreText.innerHTML = 'Score: ' + `${score}`;

            console.log("YOU WINNNN")
            gameStarted = false;
            startGameButton.style.display = "flex";

            basket.classList.add('catch-enemy-animation');
            setTimeout(() => {
                basket.classList.remove('catch-enemy-animation');
            }, 500);
        }
        if (enemyBottom < basketBottom && lives > 0 && enemyDiv.parentNode === enemies) {
            enemies.removeChild(enemyDiv);
            enemyDivs.splice(indexEnemy, 1);

        }

        enemyBottom -= 5;
        enemyDiv.style.bottom = enemyBottom + 'px';
        enemyDiv.style.left = enemyLeft + 'px';
    }
    enemyInterval = setInterval(enemyfallDown, setEasyEnemyIntervalSpeed);
    enemyTimeout = setTimeout(generateEnemies, setEasyEnemyTimeoutSpeed);
}



function generateFruits() {
    startGameButton.style.display = "none";

    var fruitBottom = gameHeight - eggHeight;
    var fruitLeft = Math.floor(Math.random() * (gameWidth - eggWidth * 2)) + eggWidth; // set the left position with a restriction of 40 pixels on both edges
    var fruitDiv = document.createElement('div');
    fruitDiv.setAttribute("class", "fruit");
    fruits.appendChild(fruitDiv);
    fruitDivs.push(fruitDiv);

    var index = fruitDivs.indexOf(fruitDiv);
    loopCount += 1;
    console.log('fruits:', loopCount)


    function fruitfallDown() {
        if (fruitBottom < basketBottom + basketHeight && fruitBottom > basketBottom && fruitLeft > basketLeft - eggWidth && fruitLeft < basketLeft + basketWidth) {
            if (fruitDiv.parentNode === fruits) {
                fruits.removeChild(fruitDiv);
            }
            fruitDivs.splice(index, 1);

            clearInterval(fruitInterval);

            score += 1;
            scoreText.innerHTML = 'Score: ' + `${score}`;

            basket.classList.add('catch-animation');
            setTimeout(() => {
                basket.classList.remove('catch-animation');
            }, 500);

            if (score == scoreToMedium) {
                // Increase setIntervalSpeed
                setIntervalSpeed = mediumIntervalSpeed;
                setTimeoutSpeed = mediumTimeoutSpeed;
            }
            if (score == scoreToHard) {
                // Increase setIntervalSpeed
                setIntervalSpeed = hardIntervalSpeed;
                setTimeoutSpeed = hardTimeoutSpeed;
            }
            if (score >= scoreToWin) {
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
            lives -= 1;
            livesText.innerHTML = 'Lives: ' + `${lives}`;
            fruits.removeChild(fruitDiv);
            fruitDivs.splice(index, 1);
        }


        if (lives == 0) {
            clearInterval(fruitInterval);
            clearTimeout(fruitTimeout);

            while (fruits.firstChild) {
                fruits.removeChild(fruits.firstChild);
            }
            fruitDivs.splice(0, fruitDivs.length);

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


document.addEventListener('keydown', controlKeys);
document.addEventListener('mousemove', moveBasketWithPointer);