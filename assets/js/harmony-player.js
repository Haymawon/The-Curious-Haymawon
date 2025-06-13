// Extended music library with duration and audio URLs
const musicLibrary = [
  {
    title: "Nobody Gets Me",
    artist: "SZA",
    cover: "/images/SOS_SZA.jpg",
    duration: "3:00",
    audio: "/Audios/SZA-Nobody-Gets-Me-Official-Lyric-Video.m4a",
  },
  {
    title: "TV",
    artist: "Billie Eilish",
    cover: "/images/photo_3_2025-06-10_17-18-23.jpg",
    duration: "4:41",
    audio: "/Audios/Billie-Eilish-TV-Official-Lyric-Video.m4a",
  },
  {
    title: "Take Me to the River (I Will Swim)",
    artist: "Alex Yurkiv, Thelma Costolo",
    cover: "/images/river.jpg",
    duration: "4:22",
    audio:
      "/Audios/Alex-Yurkiv-Thelma-Costolo-Take-Me-to-the-River-I-Will-Swim-.m4a",
  },
  {
    title: "Helplessly",
    artist: "Tatiana Manaois",
    cover: "/images/Tatiana_manaois.jpg",
    duration: "3:16",
    audio: "/Audios/Helplessly-Tatiana-Manaois-OFFICIAL-MUSIC-VIDEO.m4a",
  },
  {
    title: "Valentine",
    artist: "Jah",
    cover: "/images/photo_2025-06-11_18-16-14.jpg",
    duration: "2:33",
    audio: "/Audios/XXXTentacion-Valentine-Lyrics.m4a",
  },
  {
    title: "Riptide",
    artist: "Vance Joy",
    cover: "/images/riptide.jpg",
    duration: "3:24",
    audio: "/Audios/Vance-Joy-Riptide-Official-Video.m4a",
  },
  {
    title: "Dancing Queen",
    artist: "ABBA",
    cover: "/images/hq720 (1).avif",
    duration: "3:53",
    audio: "/Audios/Abba-Dancing-Queen-Official-Music-Video.m4a",
  },
  {
    title: "Bad Guy",
    artist: "Billie Eilish",
    cover: "/images/hq720 (2).avif",
    duration: "3:26",
    audio: "/Audios/Billie-Eilish-bad-guy.m4a",
  },
];

// DOM elements
const grid = document.getElementById("musicGrid");
const searchInput = document.getElementById("searchInput");
const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentCover = document.getElementById("currentCover");
const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const volumeBtn = document.getElementById("volumeBtn");
const volumeSlider = document.getElementById("volumeSlider");
const volumeLevel = document.getElementById("volumeLevel");
const shuffleBtn = document.getElementById("shuffleBtn");
const loopBtn = document.getElementById("loopBtn");
const reverseBtn = document.getElementById("reverseBtn");

// Player state
let currentSong = null;
let isPlaying = false;
let currentSongIndex = -1;
let isShuffled = false;
let isLooping = false;
let isReversed = false;
let playedIndices = [];
let shuffleHistory = [];

// Format time (seconds to MM:SS)
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Render music cards
function renderCards(filter = "") {
  const query = filter.toLowerCase();
  grid.innerHTML = "";

  const filteredSongs = musicLibrary.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );

  if (filteredSongs.length === 0) {
    grid.innerHTML = `
            <div class="no-results">
              <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 15px; opacity: 0.3;"></i>
              <div>No songs found. Try a different search term.</div>
            </div>
          `;
    return;
  }

  filteredSongs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "card";
    if (currentSongIndex === index) {
      card.classList.add("playing");
    }
    card.innerHTML = `
          <div class="image-container">
            <img src="${song.cover}" alt="${song.title}">
            <div class="play-overlay">
              <div class="play-icon">
                <i class="fas fa-play"></i>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="title">${song.title}</div>
            <div class="artist">${song.artist}</div>
            <div class="duration"><i class="fas fa-clock"></i> ${song.duration}</div>
          </div>
        `;

    card.addEventListener("click", () => {
      playSong(index);
    });

    grid.appendChild(card);
  });
}

// Play a song
function playSong(index) {
  // Reset previously playing card
  if (currentSongIndex !== -1) {
    const prevCards = document.querySelectorAll(".card.playing");
    prevCards.forEach((card) => card.classList.remove("playing"));
  }

  // Set new song
  currentSongIndex = index;
  currentSong = musicLibrary[index];

  // Add to shuffle history if shuffle is active
  if (isShuffled) {
    shuffleHistory.push(index);
  }

  // Update player UI
  audioPlayer.src = currentSong.audio;
  currentCover.src = currentSong.cover;
  currentTitle.textContent = currentSong.title;
  currentArtist.textContent = currentSong.artist;

  // Highlight current card
  const cards = document.querySelectorAll(".card");
  if (cards.length > index) {
    cards[index].classList.add("playing");
  }

  // Play the song
  audioPlayer.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  nowPlaying.classList.add("visible");

  // Set total time
  audioPlayer.addEventListener("loadedmetadata", () => {
    totalTime.textContent = formatTime(audioPlayer.duration);
  });
}

// Toggle play/pause
function togglePlay() {
  if (!currentSong) return;

  if (isPlaying) {
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audioPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
}

// Play next song
function playNext() {
  if (currentSongIndex === -1) return;

  let nextIndex;

  if (isShuffled) {
    // Create an array of indices that haven't been played
    const unplayedIndices = musicLibrary
      .map((_, i) => i)
      .filter((i) => !shuffleHistory.includes(i));

    if (unplayedIndices.length > 0) {
      // Pick a random unplayed song
      nextIndex =
        unplayedIndices[Math.floor(Math.random() * unplayedIndices.length)];
    } else {
      // All songs played, start over
      shuffleHistory = [];
      nextIndex = Math.floor(Math.random() * musicLibrary.length);
    }
  } else {
    if (isReversed) {
      nextIndex =
        (currentSongIndex - 1 + musicLibrary.length) % musicLibrary.length;
    } else {
      nextIndex = (currentSongIndex + 1) % musicLibrary.length;
    }
  }

  playSong(nextIndex);
}

// Play previous song
function playPrev() {
  if (currentSongIndex === -1) return;

  let prevIndex;

  if (isShuffled) {
    // Go back in shuffle history
    if (shuffleHistory.length > 1) {
      // Remove current song from history
      shuffleHistory.pop();
      // Get the previous song index
      prevIndex = shuffleHistory[shuffleHistory.length - 1];
    } else {
      // If no history, just play the first song
      prevIndex = 0;
    }
  } else {
    if (isReversed) {
      prevIndex = (currentSongIndex + 1) % musicLibrary.length;
    } else {
      prevIndex =
        (currentSongIndex - 1 + musicLibrary.length) % musicLibrary.length;
    }
  }

  playSong(prevIndex);
}

// Toggle shuffle
function toggleShuffle() {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle("active", isShuffled);

  // Reset shuffle history
  if (isShuffled) {
    shuffleHistory = [currentSongIndex];
  } else {
    shuffleHistory = [];
  }
}

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random properties
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 15 + 20;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }

  // Animate particles color
  const colors = [
    "rgba(29, 185, 84, 0.15)",
    "rgba(139, 95, 191, 0.15)",
    "rgba(30, 215, 96, 0.15)",
    "rgba(0, 183, 241, 0.15)",
  ];

  let colorIndex = 0;

  setInterval(() => {
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle) => {
      particle.style.background = colors[colorIndex];
    });
    colorIndex = (colorIndex + 1) % colors.length;
  }, 5000);
}

// Toggle loop
function toggleLoop() {
  isLooping = !isLooping;
  loopBtn.classList.toggle("active", isLooping);
}

// Toggle reverse
function toggleReverse() {
  isReversed = !isReversed;
  reverseBtn.classList.toggle("active", isReversed);
}

// Update progress bar
function updateProgress() {
  const progressPercent =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTime.textContent = formatTime(audioPlayer.currentTime);
}

// Set progress bar position
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

  audioPlayer.currentTime = (clickX / width) * duration;
}

// Set volume
function setVolume(e) {
  const width = volumeSlider.clientWidth;
  const clickX = e.offsetX;
  const volume = clickX / width;

  audioPlayer.volume = volume;
  volumeLevel.style.width = `${volume * 100}%`;

  // Update volume icon
  if (volume === 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else if (volume < 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

// Toggle mute
function toggleMute() {
  if (audioPlayer.volume > 0) {
    audioPlayer.volume = 0;
    volumeLevel.style.width = "0%";
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    audioPlayer.volume = 0.7;
    volumeLevel.style.width = "70%";
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

// Initialize event listeners
function init() {
  // Search input
  searchInput.addEventListener("input", () => {
    renderCards(searchInput.value);
  });

  // Player controls
  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", playPrev);
  nextBtn.addEventListener("click", playNext);

  // Feature controls
  shuffleBtn.addEventListener("click", toggleShuffle);
  loopBtn.addEventListener("click", toggleLoop);
  reverseBtn.addEventListener("click", toggleReverse);

  // Progress bar
  audioPlayer.addEventListener("timeupdate", updateProgress);
  progressBar.addEventListener("click", setProgress);

  // Volume controls
  volumeSlider.addEventListener("click", setVolume);
  volumeBtn.addEventListener("click", toggleMute);

  // Song ended
  audioPlayer.addEventListener("ended", () => {
    if (isLooping) {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    } else {
      playNext();
    }
  });

  // Initial render
  renderCards();

  // Set initial volume
  audioPlayer.volume = 0.7;
  volumeLevel.style.width = "70%";
}

// Start the app
init();
createParticles();
