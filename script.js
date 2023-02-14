const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
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
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playMusic();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playMusic();
}

// on load
loadSong(songs[songIndex]);

// addeventlistiner
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);