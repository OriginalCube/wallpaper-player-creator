import JSZip from 'jszip'
import { State } from '@/app/lib/store/useAction'

export const download = async (
	playlist: Array<State['songDetails'] & { music: File; image: File }>,
) => {
	const songDetails = JSON.stringify(playlist)
	const jsZip = new JSZip()

	const imagesFolder = jsZip.folder('images')
	jsZip.file('songData.json', songDetails)

	try {
		for (const song of playlist) {
			// Convert images to webp
			const imageBlob = await song.image.arrayBuffer()

			const dataURL = `data:${song.music.type};base64,${Buffer.from(imageBlob).toString('base64')}`
			const webpDataURL = await convertToWebP(dataURL)
			console.log(song)
			imagesFolder?.file(song.name, webpDataURL.split(',')[1], { base64: true })
		}

		// Fetch html preset
		jsZip.file('index.html', await (await fetch('/preset/index.html')).text())

		// Fetch CSS preset
		jsZip.file('styles.css', await (await fetch('/preset/styles.css')).text())

		// Fetch JS preset
		jsZip.file('main.js', await (await fetch('/preset/main.js')).text())

		const blobJsZip = await jsZip.generateAsync({ type: 'blob' })
		const url = URL.createObjectURL(blobJsZip)

		const link = document.createElement('a')
		link.href = url
		link.download = 'playlist.zip'

		// Programmatically click the link to trigger the download
		link.click()

		// Revoke the temporary URL and clean up
		URL.revokeObjectURL(url)
		return true
	} catch (err) {
		console.error('Error generating ZIP files.', err)
		return false
	}
}

const convertToWebP = (dataURL: string): Promise<string> => {
	return new Promise((resolve) => {
		const img = new Image()
		img.onload = () => {
			const canvas = document.createElement('canvas')
			canvas.width = img.width
			canvas.height = img.height
			const ctx = canvas.getContext('2d')!
			ctx.drawImage(img, 0, 0)
			resolve(canvas.toDataURL('image/webp'))
		}
		img.src = dataURL
	})
}
