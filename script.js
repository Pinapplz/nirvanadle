const audio = document.getElementById("audio");
const img = document.getElementById("play-button-image");
const suggestions = document.getElementById("song-suggestions");
const input = document.getElementById("guess")
const nikolasMode = document.getElementById("nikolasModeSwitch")
let currentSong;
let correct = 0;
let incorrect = 0; // Fixed typo
let alreadyGuessed = false

// Track a separate shuffled array and game index for both modes
let regularPlaylist = [];
let regularIndex = 0;
let nikolasPlaylist = [];
let nikolasIndex = 0;

// Fisher-Yates Shuffle helper function
function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Generate the initial non-repeating playlists
regularPlaylist = shuffle(songs);
nikolasPlaylist = shuffle(nikolasSongs);

pickRandomSong();

function pickRandomSong() {
    let randomSong;

    if (!nikolasMode.checked) {
        // Reshuffle if we've gone through all the regular songs
        if (regularIndex >= regularPlaylist.length) {
            regularPlaylist = shuffle(songs);
            regularIndex = 0;
        }
        randomSong = regularPlaylist[regularIndex];
        regularIndex++;
    }
    else {
        // Reshuffle if we've gone through all the Nikolas songs
        if (nikolasIndex >= nikolasPlaylist.length) {
            nikolasPlaylist = shuffle(nikolasSongs);
            nikolasIndex = 0;
        }
        randomSong = nikolasPlaylist[nikolasIndex];
        nikolasIndex++;
    }

    audio.src = randomSong.file;
    currentSong = randomSong.name;
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
    if (img) img.src = "PlayButtonNarvanadle.png"; // Fixed typo to match Narvanadle asset
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
        let score = correct - incorrect
        resultText.textContent = "Correct! \n\n Correct: " + correct + "\n Incorrect: " + incorrect + "\n\n Score: " + score;
    }
    else {
        incorrect += 1;
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

nikolasMode.addEventListener('change', (event) => {
    pickRandomSong()

    audio.pause();
    if (img) img.src = "PlayButtonNarvanadle.png";
    
    if (event.target.checked) {
        while (suggestions.firstChild) {
            suggestions.removeChild(suggestions.firstChild);
        }

        nikolasSongs.forEach(song => {
            const option = document.createElement("option");
            option.value = song.name;
            suggestions.appendChild(option);
        });
    }
    else {
        while (suggestions.firstChild) {
            suggestions.removeChild(suggestions.firstChild);
        }

        songs.forEach(song => {
            const option = document.createElement("option");
            option.value = song.name;
            suggestions.appendChild(option);
        });
    }
});
