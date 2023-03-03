const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music 
const songs = [
    {
        name : 'saber-1',
        displyName : 'Surat Yusuf',
        artist : 'Maher Al Meaqli',
    },
    {
        name : 'saber-2',
        displyName : 'Surat Ar-Raad',
        artist : 'Muhammad Siddiq Al-Minshawi',
    },
    {
        name : 'saber-3',
        displyName : 'Surat Ibrahim',
        artist : 'Abdul Basit Abdul Samad',
    },
    {
        name : 'saber-4',
        displyName : 'Surat Al-Kahf',
        artist : 'Mustafa Ismail',
    },
];


// check if playing 
let isPlaying = false;

// play music
function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause music 
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause music 
playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));

// Update DOM
function loadSong (song) {
    title.textContent = song.displyName;
    artist.textContent = song.artist;
    music.src = `/Music/${song.name}.mp3`;
    image.src = `/Photos/${song.name}.jpg`;
}

// index of song 
let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

// on load
loadSong(songs[songIndex]);

// Update progress bar & timeup
function updateProgressbar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.target;
        // Update progress bar width
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`  
        // calculate duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

         // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
         // calculate duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
// Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// addeventlistiner
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressbar);
progressContainer.addEventListener('click', setProgressBar);
