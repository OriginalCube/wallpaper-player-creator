import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { State } from '@/app/lib/store/useAction'

type DetailsProps = {
	songDetails: State['songDetails']
	close: () => void
}

const Details = ({ songDetails, close }: DetailsProps) => {
	return (
		<Dialog open>
			<DialogContent>
				<DialogHeader>Song Details</DialogHeader>
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
					<Button onClick={close}>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default Details
