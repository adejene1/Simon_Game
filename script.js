let gameOver = function () {
    let wrong = new Audio('sounds/wrong.mp3')
    wrong.play();
    $('.game-start').text('Game Over, Press Any Key to Restart');
    $('body').addClass('over-class');
    setTimeout(function () {
        $('body').removeClass('over-class');
    }, 300);
}
let randomNumber = function () {
    return Math.trunc(Math.random() * 4) + 1;
}
let checkingSounds = function (arr1,arr2) {
    for (let i = 0; i < arr2.length; i++){
        if (arr1[i] === arr2[i]) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

//Function for the audio 
let soundPlayer = function (colorName) {
    switch (colorName) {
        case 'game sound1':
            let green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case 'game sound2':
            let red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case 'game sound3':
            let yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
        case 'game sound4':
            let blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
        default:
            console.log('ntn');
    }
}

let gamePlay = false;
let gameStart = true;
let levelCount = 1;
let checkSound = [];
let playerSound = [];

//Pressing a key to start
$(document).keypress(function () { 
   
    if (gameStart) {
        $('.game-start').text('Level ' + levelCount);
        let value = randomNumber();
        let randomSound = 'game sound' + value;
        
        soundPlayer(randomSound);
        console.log(randomSound);
        document.querySelector('.sound' + value).classList.add('pressed');
        setTimeout(function () {
            document.querySelector('.sound' + value).classList.remove('pressed');
        },300)
        checkSound.push(randomSound);
        gameStart = false;
        gamePlay = true;
    }
});


//Clicking a color before pressing any key
$('.game').click(function () {
    if (gamePlay === false) {
        gameOver();
        checkSound = []
        playerSound = []
        gameStart = true;
    }
})

//Playing the game 
$('.game').click(function () {
    if (gamePlay) {
        soundPlayer(this.className);
        playerSound.push(this.className);
           
    }
    if (checkingSounds(checkSound, playerSound) === false) {
        gameOver();
        levelCount = 1;
        checkSound = [];
        playerSound = [];
        gameStart = true;
    }
    if (playerSound.length !== 0 && playerSound.length === checkSound.length) {
        if (checkingSounds(checkSound, playerSound) === true) {
            levelCount++;
            $('.game-start').text('Level ' + levelCount);
            let anotherValue = randomNumber();
            let anotherSound = 'game sound' + anotherValue;
            setTimeout(function () {
                soundPlayer(anotherSound);
            },1000)
            document.querySelector('.sound' + anotherValue).classList.add('pressed');
            setTimeout(function () {
                document.querySelector('.sound' + anotherValue).classList.remove('pressed');
            },1000)
            checkSound.push(anotherSound);
            playerSound = []
            
        } else if (checkingSounds(checkSound, playerSound) === false) {
            gameOver();
            levelCount = 1;
            checkSound = [];
            playerSound = [];
            gameStart = true;
        }
        console.log(checkSound, playerSound);
        
    }
})










