import JSZip from 'jszip'

export const download = async (playlist: Array<Object>) => {
	const songDetails = JSON.stringify(playlist)
	const jsZip = new JSZip()

	jsZip.file('songData.json', songDetails)

	try {
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
	} catch (err) {
		console.error('Error generating ZIP files.', err)
	}
}
