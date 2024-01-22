// function Start() {
//     let startButton = document.querySelector("button");
//     startButton.remove();
//     Game();
// }

let points = 0;
// Se pueden meter diferentes frases que si no le das a la correcta te sume en vez de restar porcentaje
// El "-1%" debe estar el último porque es menos probable que salga y el más poderoso
// Dependiendo del tamaño de la frase, habrá más o menos tiempo para clicarla
let words = ({
word: "+1",                                     time: 1.00,
word: "Here",                                   time: 1.00,
word: "Click me!",                              time: 1.00,
word: "Click",                                  time: 1.00,
word: "I'm a big button",                       time: 1.00,
word: "I AM THE BIGGEST BUTTON MOTHERFUCKER",   time: 1.00,
word: "Hi",                                     time: 1.00,
word: "Add one",                                time: 1.00,
word: "You're in time",                         time: 1.00,
word: "One point",                              time: 1.00,
word: "You're great",                           time: 1.00,
word: "Come on, push me!",                      time: 1.00,
word: "Leviòsa",                                time: 1.00,
word: "Leviosá",                                time: 1.00,
word: "-1%",                                    time: 1.00
});


function Game() {
    let gameButton = document.createElement("button");
    let progressBar = document.createElement("div");
    let progress = document.createElement("div");
    let score = document.createElement("h3");

    gameButton.id = "gameButton";
    gameButton.textContent = "+1";
    gameButton.addEventListener("click", click);

    progressBar.id = "progressBar";
    progress.id = "progress";
    
    score.id = "score";
    score.textContent = `SCORE: 000000${points}`;

    document.body.appendChild(gameButton);
    document.body.appendChild(progressBar);
    document.body.appendChild(progress);
    document.body.appendChild(score);
}

function click() {
    let gameButton = document.querySelector("button");
    let top = Math.floor(Math.random() * (60 - 10) + 10);
    let left = Math.floor(Math.random() * (79 - 20) + 20);
    gameButton.style.top = `${top}%`;
    gameButton.style.left = `${left}%`;
}

// setInterval(click, 500);

Game();