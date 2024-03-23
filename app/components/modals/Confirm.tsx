import React from 'react'
import {
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { useModal } from '@/app/lib/store/useModal'
import { Confirm } from '@/app/lib/modalTypes'

const Confirm = () => {
	const { message, action, actionName, close } = useModal(
		(state) => state.data,
	) as Confirm
	const closeModal = useModal((state) => state.closeModal)

	const handleAction = () => {
		action()
		closeModal()
	}
	return (
		<>
			<DialogHeader>Confirm</DialogHeader>
			<DialogDescription>{message}</DialogDescription>
			<DialogFooter>
				<Button onClick={close} variant={'outline'}>
					Close
				</Button>
				<Button onClick={handleAction}>{actionName ?? 'Confirm'}</Button>
			</DialogFooter>
		</>
	)
}

export default Confirm
