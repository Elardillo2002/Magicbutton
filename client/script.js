// function Start() {
//     let startButton = document.querySelector("button");
//     startButton.remove();
//     Game();
// }

let deadChance = 100;
let deadChanceBar = deadChance * 0.4 + 0.2;
let points = 0;
let words = "";

function ajax(options) {
    const { url, method, success, data } = options;
    const conexion = new XMLHttpRequest();
    conexion.addEventListener("load", e => {
        if (conexion.status >= 200 && conexion.status < 300) {
            success(JSON.parse(conexion.response));
        }
    });
    conexion.open(method || "GET", url, false);
    conexion.setRequestHeader("Content-type", "application/json; charset=utf-8");
    conexion.send(JSON.stringify(data));
}

ajax({
    url: "http://localhost:3000",
    success: (response) => buttonWord(response)
});

function buttonWord(response) {
    response.forEach(element => {
        words = element.words[0].text;
    });
}

function Game() {
    let gameButton = document.createElement("button");
    let progressBar = document.createElement("div");
    let progress = document.createElement("div");
    let score = document.createElement("h3");
    let top = Math.floor(Math.random() * (56 - 10) + 10);
    let left = Math.floor(Math.random() * (59 - 27) + 27);

    gameButton.id = "gameButton";
    gameButton.textContent = words;
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
}

// setInterval(click, 500);

Game();