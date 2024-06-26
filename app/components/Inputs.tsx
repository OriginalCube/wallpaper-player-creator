'use client'
import React, { ChangeEvent } from 'react'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Sketch } from '@uiw/react-color'
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import Hovertip from '@/app/components/Hovertip'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover'
import { useAction } from '@/app/lib/store/useAction'

type TextFieldProps = {
	label: string
	model: 'name' | 'image' | 'music' | 'background' | 'foreground'
	type?: string
}

export const TextField = ({ label, type, model }: TextFieldProps) => {
	const changeSongDetail = useAction((state) => state.changeSongDetail)
	const songDetails = useAction((state) => state.songDetails)
	return (
		<div className={'flex flex-col gap-2 text-primary'}>
			<Label>{label}</Label>
			<Input
				type={type}
				required
				value={songDetails[model] as string}
				onChange={(e) => {
					changeSongDetail(model, e.target.value)
				}}
			/>
		</div>
	)
}

export const ColorInput = ({ label, model }: TextFieldProps) => {
	const changeSongDetail = useAction((state) => state.changeSongDetail)
	return (
		<div className={'flex items-center justify-start gap-4 p-2 text-primary'}>
			<Popover>
				<PopoverTrigger className={'flex gap-4'}>
					<Hovertip label={'Color Input'}>
						<ArrowUpOnSquareIcon className={'size-6'} />
					</Hovertip>
					<Label className={'mx-1 cursor-pointer text-base '}>{label}</Label>
				</PopoverTrigger>
				<PopoverContent className={'size-auto border-none p-0'} side={'right'}>
					<Sketch onChange={(e) => changeSongDetail(model, e.hex)} />
				</PopoverContent>
			</Popover>
		</div>
	)
}

export const UploadInput = ({
	label,
	model,
	validation,
}: TextFieldProps & { validation: string }) => {
	const changeSongDetail = useAction((state) => state.changeSongDetail)
	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			changeSongDetail(model, file)
		}
	}

	return (
		<div className={'flex flex-col gap-2 text-primary'}>
			<Label>{label}</Label>
			<Input
				type={'file'}
				accept={validation}
				required
				onChange={(e) => handleFileInputChange(e)}
			/>{' '}
		</div>
	)
}
