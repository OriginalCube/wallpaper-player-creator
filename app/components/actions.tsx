import React from 'react'
import { ColorInput, TextField, UploadInput } from '@/app/components/Inputs'

export const details = [
	{
		component: <TextField label={'Name'} type={'string'} model={'name'} />,
	},
	{
		component: <UploadInput label={'Picture'} model={'picture'} />,
	},
	{
		component: <UploadInput label={'Music'} type={'file'} model={'music'} />,
	},
	{
		component: <ColorInput label={'Background Color'} model={'music'} />,
	},
	{
		component: <ColorInput label={'Foreground Color'} model={'music'} />,
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
