let songs = [
  {
    name: "Seharusnya_35",
    path: "assets/music/Seharusnya_35.mp3",
    artist: "artist 1",
    cover: "assets/image/cover 1.png",
  },
  {
    name: "Sekuat_Hatimu_47",
    path: "assets/music/Sekuat_Hatimu_47.mp3",
    artist: "artist 2",
    cover: "assets/image/cover 2.png",
  },
  {
    name: "Ziva-Magnolya-Pilihan-Yang-Terbaik",
    path: "assets/music/Ziva-Magnolya-Pilihan-Yang-Terbaik.mp3",
    artist: "artist 3",
    cover: "assets/image/cover 3.png",
  },
  {
    name: "Melukis Senja",
    path: "assets/music/Melukis senja.mp3",
    artist: "artist 4",
    cover: "assets/image/cover 4.png",
  },
  {
    name: "Virgoun - Bukti",
    path: "assets/music/Virgoun - Bukti.mp3",
    artist: "Virgoun",
    cover: "assets/image/cover 8.png",
  },
];
const carousel = [...document.querySelectorAll(".carousel img")];

let carouselImageIndex = 0;

const changeCarousel = () => {
  carousel[carouselImageIndex].classList.toggle("active");
  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0;
  } else {
    carouselImageIndex++;
  }
  carousel[carouselImageIndex].classList.toggle("active");
};
setInterval(() => {
  changeCarousel();
}, 3000);

////-Toggling Music Player-////
const musicPlayerList = document.querySelector(".music-player-section");

let clickCount = 1;
musicPlayerList.addEventListener("click", () => {
  if (clickCount >= 2) {
    musicPlayerList.classList.add("active");
    clickCount = 1;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});

// Back Home

const backToHomeBtn = document.querySelector(".music-player-section .btn-back");

backToHomeBtn.addEventListener("click", () => {
  musicPlayerList.classList.remove("active");
});

//play List Show
const playListSection = document.querySelector(".playlist");
const btnNav = document.querySelector(".music-player-section .btn-nav");

btnNav.addEventListener("click", () => {
  playListSection.classList.add("active");
});
const backToMusicPlayer = document.querySelector(".playlist .btn-back");

backToMusicPlayer.addEventListener("click", () => {
  playListSection.classList.remove("active");
});

//////////////////Navbar End///////////////////

////Music///
let currentMusic = 0;
const music = document.querySelector("#audio-source");
const seekBar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".curren-song-name");
const artisName = document.querySelector(".artis-name");
const coverImage = document.querySelector(".cover");
const currenMusicTime = document.querySelector(".current-time");
const currenMusicDuraction = document.querySelector(".duration");
const queue = [...document.querySelectorAll(".queue")];
///////Select All Btn
const forwardBtn = document.querySelector("i.fa-forward");
const pausedBtn = document.querySelector("i.fa-pause");
const playdBtn = document.querySelector("i.fa-play");
const backdBtn = document.querySelector("i.fa-backward");
const repeatBtn = document.querySelector("span.fa-redo");
const volumeUp = document.querySelector("span.fa-volume-up");
const volumeSlider = document.querySelector(".volume-slider");

//////Play Btn

playdBtn.addEventListener("click", () => {
  music.play();
  playdBtn.classList.remove("active");
  pausedBtn.classList.add("active");
});

pausedBtn.addEventListener("click", () => {
  music.pause();
  pausedBtn.classList.remove("active");
  playdBtn.classList.add("active");
});

// function setting up music

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  songName.innerHTML = song.name;
  artisName.innerHTML = song.artist;
  coverImage.src = song.cover;

  setTimeout(() => {
    const time = music.duration;
    seekBar.max = music.duration;
    currenMusicDuraction.innerHTML = formatTime(time);
  }, 300);
  currenMusicTime.innerHTML = `00 : 00`;
  queue.forEach((item) => item.classList.remove("active"));
  queue[currentMusic].classList.add("active");
};

setMusic(0);

//Format time 00:00
const formatTime = (time) => {
  let min = Math.floor(time / 60);

  if (min < 10) {
    min = `0` + min;
  }

  let sec = Math.floor(time % 60);

  if (sec < 10) {
    sec = `0` + sec;
  }

  return `${min} : ${sec}`;
};

// format bar even
setInterval(() => {
  seekBar.value = music.currentTime;
  // console.log(seekBar.max)
  // console.log( music.currentTime)
  currenMusicTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    if (repeatBtn.className.includes("active")) {
      setMusic(currentMusic);
      playdBtn.click();
    } else {
      forwardBtn.click();
    }
  }
}, 500);

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

//forward btn

forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playdBtn.click();
});
//Backward
backdBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic >= songs - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playdBtn.click();
});

//repeatBTN

repeatBtn.addEventListener("click", () => {
  repeatBtn.classList.toggle("active");
});

//valume section
volumeUp.addEventListener("click", () => {
  volumeUp.classList.toggle("active");
  volumeSlider.classList.toggle("active");
});
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

queue.forEach((item, i) => {
  item.addEventListener("click", () => {
    setMusic(i);
    playdBtn.click();
  });
});
