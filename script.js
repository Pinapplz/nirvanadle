const audio = document.getElementById("audio");
const img = document.getElementById("play-button-image");
const suggestions = document.getElementById("song-suggestions");
const input = document.getElementById("guess")
let currentSong;
let correct = 0;
let incorect = 0;
let alreadyGuessed = false

pickRandomSong();

function pickRandomSong() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];

    audio.src = randomSong.file;
    currentSong = randomSong.name
    console.log("Current song: " + currentSong);
}

function playButton() {
    if (audio.paused) {
        audio.play();
        if (img) img.src = "PauseButtonNarvanadle.png";
    } else {
        audio.pause();
        if (img) img.src = "PlayButtonNarvanadle.png";
    }
}

audio.addEventListener("ended", () => {
    img.src = "PlayButtonNirvanadle.png";
});

songs.forEach(song => {
    const option = document.createElement("option");

    option.value = song.name;

    suggestions.appendChild(option);
});

function checkGuess() {
    if (alreadyGuessed) return

    const guess = document.getElementById("guess").value;
    const resultPopup = document.getElementById("result-popup");
    const resultText = document.getElementById("result-text");

    if (guess.trim().toLowerCase() === currentSong.toLowerCase()) {
        correct += 1;
        let score = correct - incorect
        resultText.textContent = "Correct! \n\n Correct: " + correct + "\n Incorrect: " + incorect + "\n\n Score: " + score;
    }
    else {
        incorect += 1;
        resultText.textContent = "Incorrect: \n\n" + currentSong;
    }



    audio.pause();
    if (img) img.src = "PlayButtonNarvanadle.png";

    resultPopup.classList.add("show");
}

function closePopup() {
    document.getElementById("result-popup").classList.remove("show");
    pickRandomSong();
    input.value = null
    alreadyGuessed = false
}

const guessInput = document.getElementById("guess");

guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
        alreadyGuessed = true
    }
});
