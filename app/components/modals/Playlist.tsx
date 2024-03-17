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

const Playlist = () => {
	const playlist = useAction((state) => state.playlist)
	const openModal = useModal((state) => state.openModal)
	const close = useModal((state) => state.closeModal)
	const setData = useModal((state) => state.setData)

	const confirmEdit = () => {
		setData({
			message:
				'Are you sure you want to continue? This will result in losing the current state.',
			close: close,
			action: () => console.log('hello world'),
		})
		openModal('confirm')
	}

	return (
		<>
			{playlist.length > 0 && (
				<>
					<DialogHeader>Playlist</DialogHeader>
					<DialogDescription
						className={'flex w-full flex-col items-center justify-start gap-2'}
					>
						{playlist.map((songDetails, index) => (
							<Button key={index} variant={'link'} onClick={confirmEdit}>
								{index + 1}. {songDetails.name}
							</Button>
						))}
					</DialogDescription>
				</>
			)}
			<DialogFooter>
				<Button onClick={close}>Close</Button>
			</DialogFooter>
		</>
	)
}

export default Playlist
