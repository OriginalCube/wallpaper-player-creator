'use client'
import React, { useMemo } from 'react'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { useModal } from '@/app/lib/store/useModal'
import Details from '@/app/components/modals/Details'
import Playlist from '@/app/components/modals/Playlist'
import Confirm from '@/app/components/modals/Confirm'

const Modal = () => {
	const name = useModal((state) => state.modal)
	const isActive = useMemo(() => {
		return name.length > 0
	}, [name])

	return (
		<Dialog open={isActive}>
			<DialogContent>
				{name[name.length - 1] === 'details' && <Details />}
				{name[name.length - 1] === 'playlist' && <Playlist />}
				{name[name.length - 1] === 'confirm' && <Confirm />}
			</DialogContent>
		</Dialog>
	)
}

export default Modal
