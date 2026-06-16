let seconds = 0;
let tens = 0;
let clicks = 0;
let interval = null;
let timerStarted = false;

const secondsSpan = document.getElementById("seconds");
const tensSpan = document.getElementById("tens");
const button = document.getElementById("click_button");
const counter = document.querySelector(".count_clicks p");

const gameOverScreen = document.getElementById("game_over_screen");
const finalResult = document.getElementById("final_result");
const restartButton = document.getElementById("restart_button");

const catImage = document.getElementById("cats_images");

const mainImages = [
    "images/main_game/1.gif",
    "images/main_game/2.jpg",
    "images/main_game/3.jpg",
    "images/main_game/4.jpg",
    "images/main_game/5.jpg",
    "images/main_game/6.jpg",
    "images/main_game/7.jpg",
    "images/main_game/8.jpg",
    "images/main_game/9.gif",
    "images/main_game/10.jpg",
    "images/main_game/11.gif",
    "images/main_game/12.jpg",
    "images/main_game/13.jpg",
    "images/main_game/14.gif",
    "images/main_game/15.jpg",
    "images/main_game/16.jpg",
    "images/main_game/17.jpg",
    "images/main_game/18.jpg",
    "images/main_game/19.jpg",
    "images/main_game/20.jpg",
    "images/main_game/21.webp",
    "images/main_game/22.jpg",
    "images/main_game/23.jpg",
    "images/main_game/24.jpg",
    "images/main_game/25.gif",
    "images/main_game/26.jpg",
    "images/main_game/27.jpg",
    "images/main_game/28.jfif",
    "images/main_game/29.jpg",
    "images/main_game/30.jpg",
    "images/main_game/31.jpg",
    "images/main_game/32.jpg",
    "images/main_game/33.jpg",
    "images/main_game/34.jpg",
    "images/main_game/35.gif",
    "images/main_game/36.gif",
    "images/main_game/37.gif",
    "images/main_game/38.gif",
    "images/main_game/39.gif",
    "images/main_game/40.gif",
    "images/main_game/41.gif",
    "images/main_game/42.gif",
    "images/main_game/43.gif",
    "images/main_game/44.gif",
    "images/main_game/45.gif",
    "images/main_game/46.gif",
    "images/main_game/47.jpg",
    "images/main_game/48.gif",
    "images/main_game/49.gif",
    "images/main_game/50.gif",
    "images/main_game/51.gif",
    "images/main_game/52.gif",
    "images/main_game/53.gif",
    "images/main_game/54.jpg",
    "images/main_game/55.gif",
    "images/main_game/56.gif",
    "images/main_game/57.gif",
    "images/main_game/58.gif",
];

const gameOverImages = [
    "images/game_over/1.jpg",
    "images/game_over/2.jpg",
    "images/game_over/3.jpg",
    "images/game_over/4.jpg",
    "images/game_over/5.jpg",
    "images/game_over/6.jpg",
    "images/game_over/7.jpg",
    "images/game_over/8.jpg",
    "images/game_over/9.jpg",
    "images/game_over/10.gif",
    "images/game_over/11.gif",
    "images/game_over/12.jpg",
    "images/game_over/13.jpg",
    "images/game_over/14.jfif",
    "images/game_over/15.jpg",
    "images/game_over/16.gif",
    "images/game_over/17.jpg",
    "images/game_over/18.jpg",
    "images/game_over/19.gif",
    "images/game_over/20.jpg",
    "images/game_over/21.gif",
    "images/game_over/22.jpg",
    "images/game_over/23.jpg",
    "images/game_over/24.jpg",
    "images/game_over/25.gif",
    "images/game_over/26.jpg",
    "images/game_over/27.gif",
    "images/game_over/28.gif",
    "images/game_over/29.gif",
    "images/game_over/30.gif",
    "images/game_over/31.gif",
    "images/game_over/32.jpg",
    "images/game_over/33.jpg",
    "images/game_over/34.webp",
    "images/game_over/35.gif"
];

function startTimer() {
    tens++;

    if (tens > 99) {
        seconds++;
        tens = 0;
    }

    secondsSpan.textContent = seconds < 10 ? "0" + seconds : seconds;
    tensSpan.textContent = tens < 10 ? "0" + tens : tens;
}

button.addEventListener("pointerdown", function () {

    if (!timerStarted) {
        interval = setInterval(startTimer, 10);
        timerStarted = true;
    }

    clicks++;
    counter.textContent = clicks + " / 50";

    if (clicks % 4 === 0) {
    catImage.src = getRandomImage(mainImages);
    }

    if (clicks === 50) {
        clearInterval(interval);
        showGameOver();
        button.disabled = true;
    }
});

function showGameOver() {

    const resultImage = document.querySelector(".game-over-content img");

    resultImage.src = getRandomImage(gameOverImages);


    let totalTime = seconds + "." + (tens < 10 ? "0" + tens : tens);

    finalResult.textContent =
        "Babayla zor yarışırlar! " + totalTime + " saniyeni boşuna harcadın!";

    gameOverScreen.style.display = "flex";
}

restartButton.addEventListener("pointerdown", function () {

    seconds = 0;
    tens = 0;
    clicks = 0;
    timerStarted = false;

    clearInterval(interval);

    secondsSpan.textContent = "00";
    tensSpan.textContent = "00";
    counter.textContent = "0 / 50";

    button.disabled = false;
    gameOverScreen.style.display = "none";
});

document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
});

document.addEventListener("gestureend", function (e) {
    e.preventDefault();
});

let lastTouchEnd = 0;

document.addEventListener("touchend", function (event) {
    let now = new Date().getTime();

    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }

    lastTouchEnd = now;
}, false);

let lastImage = "";

function getRandomImage(images) {

    let newImage;

    do {
        newImage = images[Math.floor(Math.random() * images.length)];
    } while (newImage === lastImage);

    lastImage = newImage;

    return newImage;
}