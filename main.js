const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progress");
const customProgressBar = document.getElementById("custom-progress-bar");

const baseURL = "/songs";

let currentTrack = 0;
let savedTime = 0;
let savedPlayback = 1;

const songs = [
  { file: "Aidan.mp3", albumArt: "Aidan.jpg" },
  { file: "autumn_sun.mp3", albumArt: "autumn_sun.jpg" },
  { file: "best_part_of_me.mp3", albumArt: "BestPart.jpg" },
  { file: "Better Days - LAKEY INSPIRED.mp3", albumArt: "Better Days.jpg" },
  { file: "i_cant_make_you_love_me_cover.mp3", albumArt: "i_cant_make_you_love_me_cover.jpeg" },
  { file: "just_relax.mp3", albumArt: "justRelax_img.jpeg" },
  { file: "paranormal-is-real-leonell-cassio.mp3", albumArt: "paranormal_real_500.jpg" },
  { file: "Polarity.mp3", albumArt: "Polarity.jpg" },
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
  currentTrack > 0 ? (currentTrack -= 1) : (currentTrack = 7);
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
  currentTrack < 7 ? (currentTrack += 1) : (currentTrack = 0);
});

skipButton.addEventListener("click", () => {
  audioPlayer.currentTime += 5;
  savedTime = audioPlayer.currentTime;
});

rewindButton.addEventListener("click", () => {
  audioPlayer.currentTime -= 5;
  savedTime = audioPlayer.currentTime;
});

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = audioPlayer.currentTime / audioPlayer.duration;
  customProgressBar.style.width = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;

  console.log(`${audioPlayer.currentTime} / ${audioPlayer.duration}`);

  audioPlayer.playbackRate += .01;
});

document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {
    case " ":
      event.preventDefault();
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
      break;

    case "m":
      audioPlayer.muted = !audioPlayer.muted;
      break;
  }
});
