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
	return (
		<div className={'flex flex-col gap-2 text-primary'}>
			<Label>{label}</Label>
			<Input
				type={type}
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
				<PopoverTrigger>
					<Hovertip label={'Color Input'}>
						<ArrowUpOnSquareIcon className={'size-6'} />
					</Hovertip>
				</PopoverTrigger>
				<PopoverContent className={'size-auto border-none p-0'}>
					<Sketch onChange={(e) => changeSongDetail(model, e.hex)} />
				</PopoverContent>
			</Popover>
			<Label className={'mx-1 text-base'}>{label}</Label>
		</div>
	)
}

export const UploadInput = ({ label, model }: TextFieldProps) => {
	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const base64String = reader.result?.toString().split(',')[1]
				if (base64String) {
					console.log(base64String)
				}
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className={'flex flex-col gap-2 text-primary'}>
			<Label>{label}</Label>
			<Input type={'file'} onChange={(e) => handleFileInputChange(e)} />{' '}
		</div>
	)
}
