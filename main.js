const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progress");
const customProgressBar = document.getElementById("custom-progress-bar");

const baseURL = "/songs";
const imageURL = "/albumart";

let currentText = document.getElementById("currentSong");
let currentSpeed = document.getElementById("currentSpeed");

let currentTrack = 0;
let savedTime = 0;
let savedPlayback = 1;

const songs = [
  { file: "Aidan.mp3", albumArt: "Aidan.jpg", name: "Aidan" },
  { file: "autumn_sun.mp3", albumArt: "autumn_sun.png", name: "Autumn Sun" },
  {
    file: "best_part_of_me.mp3",
    albumArt: "BestPart.jpg",
    name: "Best Part of Me",
  },
  {
    file: "Better Days - LAKEY INSPIRED.mp3",
    albumArt: "Better Days.jpg",
    name: "Better Days",
  },
  {
    file: "just_relax.mp3",
    albumArt: "justRelax_img.jpeg",
    name: "Just Relax",
  },
  {
    file: "paranormal-is-real-leonell-cassio.mp3",
    albumArt: "paranormal_real_500.jpg",
    name: "Paranormal is Real",
  },
  { file: "Polarity.mp3", albumArt: "Polarity.jpg", name: "Polarity" },
];

playButton.addEventListener("click", () => {
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  audioPlayer.load();
  audioPlayer.currentTime = savedTime;
  audioPlayer.playbackRate = savedPlayback;
  playButton.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
  audioPlayer.play();
});

pauseButton.addEventListener("click", () => {
  console.log("pause");
  savedTime = audioPlayer.currentTime;
  savedPlayback = audioPlayer.playbackRate;
  playButton.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
  audioPlayer.pause();
});

prevButton.addEventListener("click", () => {
  if (!pauseButton.classList.contains("hidden")) {
    audioPlayer.pause();
    playButton.classList.toggle("hidden");
    pauseButton.classList.toggle("hidden");
  }
  console.log("prev");
  savedTime = 0;
  savedPlayback = 1;
  audioPlayer.currentTime = savedTime;
  audioPlayer.playbackRate = savedPlayback;
  currentTrack > 0 ? (currentTrack -= 1) : (currentTrack = 6);
  currentSongImage.src = `${imageURL}/${songs[currentTrack].albumArt}`;
  currentText.textContent = `Current Song: ${songs[currentTrack].name}`;

  currentTrack === 6
    ? (nextSongImage.src = `${imageURL}/${songs[0].albumArt}`)
    : (nextSongImage.src = `${imageURL}/${songs[currentTrack + 1].albumArt}`);
  currentTrack === 0
    ? (prevSongImage.src = `${imageURL}/${songs[6].albumArt}`)
    : (prevSongImage.src = `${imageURL}/${songs[currentTrack - 1].albumArt}`);
});

nextButton.addEventListener("click", () => {
  if (!pauseButton.classList.contains("hidden")) {
    audioPlayer.pause();
    playButton.classList.toggle("hidden");
    pauseButton.classList.toggle("hidden");
  }
  console.log("next");
  savedTime = 0;
  savedPlayback = 1;
  audioPlayer.currentTime = savedTime;
  audioPlayer.playbackRate = savedPlayback;
  currentTrack < 6 ? (currentTrack += 1) : (currentTrack = 0);
  currentSongImage.src = `${imageURL}/${songs[currentTrack].albumArt}`;
  currentText.textContent = `Current Song: ${songs[currentTrack].name}`;

  currentTrack === 6
    ? (nextSongImage.src = `${imageURL}/${songs[0].albumArt}`)
    : (nextSongImage.src = `${imageURL}/${songs[currentTrack + 1].albumArt}`);
  currentTrack === 0
    ? (prevSongImage.src = `${imageURL}/${songs[6].albumArt}`)
    : (prevSongImage.src = `${imageURL}/${songs[currentTrack - 1].albumArt}`);
});

forwardButton.addEventListener("click", () => {
  audioPlayer.currentTime += 5;
  savedTime = audioPlayer.currentTime;
  audioPlayer.playbackRate += 0.1;
});

rewindButton.addEventListener("click", () => {
  audioPlayer.currentTime -= 5;
  savedTime = audioPlayer.currentTime;
  audioPlayer.playbackRate -= 0.1;
});

audioPlayer.addEventListener("timeupdate", () => {
  customProgressBar.style.width = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;

  console.log(`${audioPlayer.currentTime} / ${audioPlayer.duration}`);

  audioPlayer.currentTime < 0.1
    ? (audioPlayer.playbackRate = 1)
    : (audioPlayer.playbackRate += 0.01);
  currentSpeed.textContent = `Current Speed: ${
    Math.round(audioPlayer.playbackRate * 100) / 100
  }x`;
});

document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {
    case " ":
      event.preventDefault();
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
      playButton.classList.toggle("hidden");
      pauseButton.classList.toggle("hidden");
      break;

    case "m":
      audioPlayer.muted = !audioPlayer.muted;
      break;

    case "arrowleft":
      audioPlayer.currentTime -= 5;
      savedTime = audioPlayer.currentTime;
      audioPlayer.playbackRate -= 0.1;
      break;

    case "arrowright":
      audioPlayer.currentTime += 5;
      savedTime = audioPlayer.currentTime;
      audioPlayer.playbackRate += 0.1;
      break;
  }
});
