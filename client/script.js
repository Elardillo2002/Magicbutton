let clicked = false;
let deadChance = 100;
let deadChanceBar = deadChance * 0.4 + 0.2;
let deadNumber = Math.floor(Math.random() * 100 - 1) + 1; // Generate the number that kills de player
let points = 0;
let words = "";
let time = 0;
let timer;

let probability = new Set();

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
    let survivalChance = document.createElement("p");
    let score = document.createElement("h3");

    gameButton.id = "gameButton";
    gameButton.textContent = "Start";
    gameButton.style.top = "30%";
    gameButton.style.left = "45%";
    gameButton.addEventListener("click", click);

    progressBar.style.width = `${deadChanceBar}%`;
    progressBar.id = "progressBar";
    progress.id = "progress";

    score.id = "score";
    score.textContent = `SCORE: 000000000`;

    survivalChance.textContent = `Survival chance: ${deadChance}%`;
    survivalChance.id = "survivalChance";

    document.body.appendChild(gameButton);
    document.body.appendChild(progressBar);
    document.body.appendChild(progress);
    document.body.appendChild(score);
    document.body.appendChild(survivalChance);
}

function click() {
    clearTimeout(timer); // Restart timer

    ajax({
        url: "http://localhost:3000/words", 
        success: (response) => {
            buttonWord(response);

            deadChanceBar = deadChance * 0.4 + 0.2;
            let gameButton = document.querySelector("button");
            let score = document.querySelector("#score");
            let progressBar = document.querySelector("#progressBar");
            let survivalChance = document.querySelector("#survivalChance");

            let top = Math.floor(Math.random() * (56 - 10) + 10);
            let left = Math.floor(Math.random() * (59 - 27) + 27);
            gameButton.textContent = words;
            gameButton.style.top = `${top}%`;
            gameButton.style.left = `${left}%`;
            progressBar.style.width = `${deadChanceBar}%`;
            survivalChance.textContent = `Survival chance: ${deadChance}%`;

            if (clicked == true) {
                points = points + 10;
            }
            clicked = true;
            let scoreText = String(points).padStart(9, '0');
            score.textContent = `SCORE: ${scoreText}`;

            startTimer();
        }
    });
}

function deadChancePercentage() {
    deadChance--;
    for (let i = 0; i < 1; i++) {
        let probabilityNumber = Math.floor(Math.random() * 100 - 1) + 1;
        if (!probability.has(probabilityNumber)) {
            probability.add(probabilityNumber);
            if (probability.has(deadNumber)) {
                gameOver();
            }
        } else {
            i--;
        }  
    }
}

function startTimer() {
    timer = setTimeout(() => {
        clicked = false;
        click();
        deadChancePercentage();
    }, time);
}

function gameOver() {
    clearTimeout(timer);
    let button = document.querySelector("button");
    button.remove();
    let h1 = document.createElement("h1");
    h1.textContent = "GAME OVER";
    h1.style.color = "red";
    document.body.appendChild(h1);
}

Game();