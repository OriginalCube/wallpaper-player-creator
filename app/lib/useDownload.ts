import JSZip from 'jszip'

export const download = (playlist: Array<Object>) => {
	const songDetails = JSON.stringify(playlist)
	const jsZip = new JSZip()

	jsZip.file('songData.json', songDetails)

	jsZip
		.generateAsync({ type: 'blob' })
		.then((blob) => {
			// Create a temporary URL for the blob
			const url = URL.createObjectURL(blob)

			// Create a temporary link element
			const link = document.createElement('a')
			link.href = url
			link.download = 'example.zip'

			// Programmatically click the link to trigger the download
			link.click()

			// Revoke the temporary URL and clean up
			URL.revokeObjectURL(url)
		})
		.catch((error) => {
			console.error('Error generating ZIP file:', error)
		})
}
