var audio = document.createElement('audio')
var index = 0
var volume = localStorage.getItem('custom-player-volume') ? JSON.parse(localStorage.getItem('custom-player-volume')) : 0.5
var foreground = ''
var wallpaperActive = true
var settings = false
var songData = []
var playlist = localStorage.getItem('custom-player-playlist') ? JSON.parse(localStorage.getItem('custom-player-playlist')) : false

loadApplication()

async function loadApplication() {
    await fetchSongData()
    await loadSong()
    updatePlaylist()
}

function updatePlaylist() {
    if (songData.length <= 0) return

    for (const [songIndex, songInfo] of songData.entries()) {
        const p = document.createElement('p');
        p.textContent = `${songIndex + 1}. ${songInfo.name}`
        p.addEventListener('click', () => {
            loadSong(true, songIndex)
        })
        document.getElementById('playlist-container').appendChild(p)
    }
}

async function fetchSongData() {
    try {
        const response = await fetch('songData.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        songData = await response.json(); // Store the JSON response globally
    } catch (error) {
        console.error('Failed to fetch song data:', error);
    }
}

async function loadSong(next = true, changeSong) {
    try {
        const data = songData

        // Update index based on next flag
        if (changeSong === undefined) {
            index = next ? (index + 1) % data.length : (index - 1 + data.length) % data.length;
        } else {
            index = changeSong
        }

        const currentSong = data[index];

        // Update visual elements
        foreground = currentSong.foreground
        updateImage(currentSong);
        updateBackground(currentSong);
        updateName(currentSong);
        updatePlaylistColors(currentSong)
        togglePlaylist(true)

        // Set audio properties and events
        audio.src = `./songs/${currentSong.name}`;
        audio.controls = true;
        audio.volume = volume;

        initializeSlider();

        await playAudio();
    } catch (error) {
        console.error('There was a problem with your operation:', error);
    }
}

function updateImage(song) {
    const imageElement = document.getElementById('image');
    imageElement.src = `./images/${song.name}`;
    imageElement.style.boxShadow = `0px 0px 12px ${song.foreground}`;
}

function updateBackground(song) {
    document.getElementById('background').style.backgroundColor = song.background;
}

function updateName(song) {
    document.getElementById('name').textContent = song.name;
}

function updatePlaylistColors(song) {
    document.getElementById('playlist').style.boxShadow = `0px 0px 4px ${song.foreground}`
}

function initializeSlider() {
    const slider = document.getElementById('slider');

    slider.addEventListener('input', () => {
        audio.currentTime = slider.value;
    });

    audio.addEventListener('loadedmetadata', () => {
        slider.max = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
        slider.value = audio.currentTime;
    });
}


audio.addEventListener('ended', async function () {
    await loadSong(true)
})

async function playAudio() {
    await audio.play()
    document.getElementById('play').style.display = 'none'
    document.getElementById('pause').style.display = 'block'
}

function pauseAudio() {
    audio.pause()
    document.getElementById('pause').style.display = 'none'
    document.getElementById('play').style.display = 'block'
}

function enableSettings() {
    settings = !settings
    document.getElementById('settings-option').style.visibility = settings ? 'visible' : 'hidden'
}

function disable() {
    if (wallpaperActive) {
        audio.pause()
        document.getElementById('player').style.visibility = 'hidden'
    } else {
        audio.play()
        document.getElementById('player').style.visibility = 'visible'
    }
    wallpaperActive = !wallpaperActive
}

function togglePlaylist(onLoad = false) {
    if (!onLoad) playlist = !playlist
    document.getElementById('playlist').style.visibility = playlist ? 'visible' : 'hidden'
    localStorage.setItem('custom-player-playlist', playlist)
}

function adjustVolume(increase = true) {
    if (increase) {
        if ((volume + 0.1).toFixed(1) < 1) {
            volume += 0.1
            audio.volume = volume
        }
    } else {
        if ((volume - 0.1).toFixed(1) > 0) {
            volume -= 0.1
            audio.volume = volume
        } else {
            volume = 0
            audio.volume = volume
        }
    }
    localStorage.setItem('custom-player-volume', volume)
}

// Wallpaper engine settings
let canvas = document.getElementById('AudioCanvas')
canvas.width = window.innerWidth * .35
canvas.height = window.innerHeight * .15

function wallpaperAudioListener(audioArray) {
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let barWidth = (canvas.width / audioArray.length);
    let halfCount = audioArray.length / 2;
    // Begin with the left channel in red
    ctx.fillStyle = foreground
    let tempHeight = canvas.height * .85;
    // Iterate over the first 64 array elements (0 - 63) for the left channel audio data
    for (let i = 0; i < halfCount; ++i) {
        // Create an audio bar with its hight depending on the audio volume level of the current frequency
        let height = tempHeight * Math.min(audioArray[i], 1);
        ctx.globalAlpha = .7;
        ctx.fillRect(barWidth * i * 2 + 2, canvas.height - height, barWidth, height);
        ctx.globalAlpha = .7;
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 5;
    }
}


// Register the audio listener provided by Wallpaper Engine.
window.wallpaperRegisterAudioListener(wallpaperAudioListener)
