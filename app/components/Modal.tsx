'use client'
import React from 'react'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { useModal } from '@/app/lib/store/useModal'
import Details from '@/app/components/modals/Details'
import Playlist from '@/app/components/modals/Playlist'

const Modal = () => {
	const state = useModal((state) => state.active)
	const name = useModal((state) => state.modal)

	return (
		<Dialog open={state}>
			<DialogContent>
				{name === 'details' && <Details />}
				{name === 'playlist' && <Playlist />}
			</DialogContent>
		</Dialog>
	)
}

export default Modal
