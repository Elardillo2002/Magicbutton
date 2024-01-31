// function Start() {
//     let startButton = document.querySelector("button");
//     startButton.remove();
//     Game();
//     startTimer();
// }

let deadChance = 100;
let deadChanceBar = deadChance * 0.4 + 0.2;
let points = 0;
let words = "";
let time = 0;
let timer;

function ajax(options) {
    const {success, data} = options;
    const conexion = new XMLHttpRequest();
    conexion.addEventListener("load", e => {
        if (conexion.status >= 200 && conexion.status < 300) {
            success(JSON.parse(conexion.response));
        }
    });
    conexion.open("GET", "http://localhost:3000/words", false);
    conexion.setRequestHeader("Content-type", "application/json; charset=utf-8");
    conexion.send(JSON.stringify(data));
}

function buttonWord(response) {
    const index = Math.floor(Math.random() * response.length);
    words = response[index].text;
    time = response[index].time;
}

function Game() {
    let gameButton = document.createElement("button");
    let progressBar = document.createElement("div");
    let progress = document.createElement("div");
    let score = document.createElement("h3");
    let top = Math.floor(Math.random() * (56 - 10) + 10);
    let left = Math.floor(Math.random() * (59 - 27) + 27);

    gameButton.id = "gameButton";
    gameButton.textContent = "+10";
    gameButton.style.top = `${top}%`;
    gameButton.style.left = `${left}%`;
    gameButton.addEventListener("click", click);

    progressBar.style.width = `${deadChanceBar}%`;
    progressBar.id = "progressBar";
    progress.id = "progress";

    score.id = "score";
    score.textContent = `SCORE: 00000000`;

    document.body.appendChild(gameButton);
    document.body.appendChild(progressBar);
    document.body.appendChild(progress);
    document.body.appendChild(score);
}

function click() {
    ajax({
        url: "http://localhost:3000/words", 
        success: (response) => {
            buttonWord(response);

            let gameButton = document.querySelector("button");
            let score = document.querySelector("#score");

            let top = Math.floor(Math.random() * (56 - 10) + 10);
            let left = Math.floor(Math.random() * (59 - 27) + 27);
            gameButton.textContent = words;
            gameButton.style.top = `${top}%`;
            gameButton.style.left = `${left}%`;

            points = points + 10;
            let scoreText = String(points).padStart(8, '0');
            score.textContent = `SCORE: ${scoreText}`;

            startTimer();
        }
    });
}

function startTimer() {
    timer = setTimeout(() => {
        click();
    }, time);
}

// setInterval(click, 500);

Game();