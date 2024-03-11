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
	const close = useModal((state) => state.closeModal)

	return (
		<>
			{playlist.length > 0 && (
				<>
					<DialogHeader>Playlist</DialogHeader>
					<DialogDescription>
						{playlist.map((songDetails, index) => (
							<Button key={index} variant={'link'}>
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
