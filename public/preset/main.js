var audio = document.createElement('audio')
var index = 0
var volume = 0.5

function loadSong(next = true) {
	fetch('songData.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then((data) => {
			if (next) {
				if (index + 1 > data.length - 1) index = 0
				else index++
			} else {
				if (index - 1 < 0) index = data.length - 1
				else index--
			}

			// Set the simple data
			document.getElementById('image').src = data[index].image // Assuming data.image contains the base64-encoded image data
			document.getElementById('background').style.backgroundColor =
				data[index].background
			document.getElementById('name').textContent = data[index].name

			// Set the audio
			audio.src = data[index].music
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

			audio.addEventListener('ended', function () {
				playAudio(0)
			})

			playAudio()
		})
		.catch((error) => {
			console.error('There was a problem with your fetch operation:', error)
		})
}

loadSong()

function playAudio() {
	audio.play()
	document.getElementById('play').style.display = 'none'
	document.getElementById('pause').style.display = 'block'
}

function pauseAudio() {
	audio.pause()
	document.getElementById('pause').style.display = 'none'
	document.getElementById('play').style.display = 'block'
}

function adjustVolume(increase = true) {
	if (increasse) {
		if (volume + 0.1 < 1) volume + 0.1
	} else {
		if (volume - 0.1 > 0) volume - 0.1
	}
}
