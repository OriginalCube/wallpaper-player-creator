var audio = document.createElement('audio')
var index = 0
var volume = 0.5
var foreground = ''
var wallpapaerActive = true

loadSong()

async function loadSong(next = true) {
    try {
        const response = await fetch('songData.json')

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()

        if (next && audio.paused) {
            if (index + 1 > data.length - 1) {
                index = 0
            } else {
                index++
            }
        } else {
            if (index - 1 < 0) {
                index = data.length - 1
            } else {
                index--
            }
        }

        // Set the simple data
        document.getElementById('image').src = './images/' + data[index].name// Assuming data.image contains the base64-encoded image data
        document.getElementById('background').style.backgroundColor =
            data[index].background
        document.getElementById('name').textContent = data[index].name
        foreground = data[index].foreground

        // Set the audio
        audio.src = './songs/' + data[index].name
        audio.controls = true
        audio.volume = volume

        const slider = document.getElementById('slider')
        slider.addEventListener('input', function () {
            // Update the current time of the audio element when slider is adjusted
            audio.currentTime = this.value
        })

        audio.addEventListener('loadedmetadata', function () {
            // Set the maximum value of the slider to the duration of the audio
            slider.max = audio.duration
        })

        // Update the slider value as the audio plays
        audio.addEventListener('timeupdate', function () {
            document.getElementById('slider').value = this.currentTime
        })

        await playAudio()
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error)
    }
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

function disable() {
    if (wallpapaerActive) {
        audio.pause()
        document.getElementById('playlist').style.visibility = 'hidden'
    } else {
        audio.play()
        document.getElementById('playlist').style.visibility = 'visible'
    }
    wallpapaerActive = !wallpapaerActive
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
            audio.volume = 0
        }
    }
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
