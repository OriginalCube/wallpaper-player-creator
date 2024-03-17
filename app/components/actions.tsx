import React from 'react'
import { ColorInput, TextField, UploadInput } from '@/app/components/Inputs'

export const details = [
	{
		component: <TextField label={'Name'} type={'string'} model={'name'} />,
	},
	{
		component: (
			<UploadInput
				label={'Picture'}
				model={'image'}
				type={'webp'}
				validation={'image/*'}
			/>
		),
	},
	{
		component: (
			<UploadInput
				label={'Music'}
				model={'music'}
				type={'mp3'}
				validation={'audio/*'}
			/>
		),
	},
	{
		component: <ColorInput label={'Background Color'} model={'background'} />,
	},
	{
		component: <ColorInput label={'Foreground Color'} model={'foreground'} />,
	},
]

export function SidebarActions() {
	return (
		<>
			{details.map(({ component }, index) => (
				<React.Fragment key={index}>{component}</React.Fragment>
			))}
		</>
	)
}
