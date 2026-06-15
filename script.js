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

    if (clicks === 50) {
        clearInterval(interval);
        showGameOver();
        button.disabled = true;
    }
});

function showGameOver() {
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