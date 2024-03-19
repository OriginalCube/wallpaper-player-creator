'use client'
import React from 'react'
import {
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { useModal } from '@/app/lib/store/useModal'
import { useAction } from '@/app/lib/store/useAction'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { toast } from 'sonner'

const Playlist = () => {
	const playlist = useAction((state) => state.playlist)
	const openModal = useModal((state) => state.openModal)
	const close = useModal((state) => state.closeModal)
	const setData = useModal((state) => state.setData)
	const deleteFromPlaylist = useAction((state) => state.deleteFromPlaylist)

	const editSong = (id: number) => {
		setData({
			message:
				'Are you sure you want to continue? This will result in losing the current state.',
			close: close,
			action: () => console.log('hello world'),
		})
		openModal('confirm')
	}

	const deleteSong = (id: number) => {
		setData({
			message: `Are you sure you want to delete song ${id + 1}? This action cannot be reverted`,
			close: close,
			action: () => {
				deleteFromPlaylist(id)
				toast.success('Song Deleted from playlist.')
				close()
			},
		})
		openModal('confirm')
	}

	return (
		<>
			{playlist.length === 0 && <p>Playlist is empty.</p>}
			{playlist.length > 0 && (
				<>
					<DialogHeader>Playlist</DialogHeader>
					<div
						className={'flex w-full flex-col items-center justify-start gap-2'}
					>
						{playlist.map((songDetails, index) => (
							<div className={'flex w-full justify-between p-2'} key={index}>
								<Button key={index} variant={'link'}>
									{index + 1}. {songDetails.name}
								</Button>
								<div className={'flex gap-2'}>
									<Button
										className={'p-2 px-3'}
										variant={'outline'}
										onClick={() => editSong(index)}
									>
										<PencilSquareIcon className={'size-4 '} />
									</Button>
									<Button
										className={'p-2 px-3'}
										variant={'outline'}
										onClick={() => deleteSong(index)}
									>
										<TrashIcon className={'size-4 '} />
									</Button>
								</div>
							</div>
						))}
					</div>
				</>
			)}
			<DialogFooter>
				<Button onClick={close}>Close</Button>
			</DialogFooter>
		</>
	)
}

export default Playlist
