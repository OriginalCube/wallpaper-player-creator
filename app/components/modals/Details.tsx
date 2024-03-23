import React from 'react'
import { DialogDescription, DialogFooter } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { useAction } from '@/app/lib/store/useAction'
import { useModal } from '@/app/lib/store/useModal'
import { toast } from 'sonner'

const Details = () => {
	const songDetails = useAction((state) => state.songDetails)
	const addSong = useAction((state) => state.addToPlaylist)
	const close = useModal((state) => state.closeModal)
	const editId = useAction((state) => state.editId)
	const updateEdit = useAction((state) => state.updateEdit)

	const handleAddSong = () => {
		let action
		if (editId === null || editId === undefined) {
			addSong()
			action = 'Added'
		} else {
			updateEdit(editId)
			action = 'Updated'
		}
		toast.success(`${action} song to the playlist.`)
		close()
	}

	return (
		<>
			<DialogDescription className={'flex flex-col gap-2'}>
				<span>Name: {songDetails.name}</span>
				<span>Background: {songDetails.background}</span>
				<span>Foreground: {songDetails.foreground}</span>
				<span>
					Image: {songDetails.image ? 'Uploaded' : 'No files uploaded'}
				</span>
				<span>
					Music: {songDetails.music ? 'Uploaded' : 'No files uploaded'}
				</span>
			</DialogDescription>
			<DialogFooter>
				<Button onClick={close} variant={'outline'}>
					Close
				</Button>
				<Button onClick={handleAddSong}>Add</Button>
			</DialogFooter>
		</>
	)
}

export default Details
