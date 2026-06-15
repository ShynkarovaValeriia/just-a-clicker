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
    "images/main_game/“thoses who look only in the past or present are certain to miss the future”.webp",
    "images/main_game/cats.webp",
    "images/main_game/завантаження (65).jfif",
    "images/main_game/завантаження (66).jfif",
    "images/main_game/завантаження (68).jfif",
    "images/main_game/завантаження (69).jfif",
    "images/main_game/завантаження (71).jfif",
    "images/main_game/завантаження.webp"
];

const gameOverImages = [
    "images/game_over/¿Cariño o lástima_ Descubre por qué sigue contigo.jfif",
    "images/game_over/40+ Pics Without Context That Get Funnier and Funnier the Longer You Look at Them.webp",
    "images/game_over/240 Best Cat Memes and Images For Funny Captions - Page 3 of 11 - LittleNivi_Com.jfif",
    "images/game_over/Absolute meowl.webp",
    "images/game_over/Adios.jfif",
    "images/game_over/Barış.jfif",
    "images/game_over/funny_end.gif",
    "images/game_over/завантаження (71) – копія.jfif"
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

    if (clicks % 5 === 0) {
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
        "Поздравляю! Ты потратил " + totalTime + " секунд зря!";

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

function getRandomImage(images) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

let lastImage = "";

function getRandomImage(images) {

    let newImage;

    do {
        newImage = images[Math.floor(Math.random() * images.length)];
    } while (newImage === lastImage);

    lastImage = newImage;

    return newImage;
}