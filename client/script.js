// function Start() {
//     let startButton = document.querySelector("button");
//     startButton.remove();
//     Game();
// }

let deadChance = 100;
let deadChanceBar = deadChance * 0.4 + 0.2;
let words = "";

let points = 0;

function ajax() {
    const url = 'words.json';
    const conexion = new XMLHttpRequest();
    conexion.open("GET", url, false);
    conexion.send();

    conexion.addEventListener("load", e => {
        if (conexion.status >= 200 && conexion.status < 300) {
            const data = JSON.parse(conexion.responseText);
            console.log(data);
        }
    });
}

ajax();

function Game() {
    let gameButton = document.createElement("button");
    let progressBar = document.createElement("div");
    let progress = document.createElement("div");
    let score = document.createElement("h3");

    gameButton.id = "gameButton";
    gameButton.textContent = words;
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
    let gameButton = document.querySelector("button");
    let score = document.querySelector("#score");

    let top = Math.floor(Math.random() * (60 - 10) + 10);
    let left = Math.floor(Math.random() * (79 - 20) + 20);
    gameButton.textContent = "I AM THE BIGGEST BUTTON MOTHERFUCKER";
    gameButton.style.top = `${top}%`;
    gameButton.style.left = `${left}%`;

    points = points + 10;
    let scoreText = String(points).padStart(8, '0');
    score.textContent = `SCORE: ${scoreText}`;
}

// setInterval(click, 500);

Game();