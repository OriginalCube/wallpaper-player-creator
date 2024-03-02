'use client'
import React, { ChangeEvent } from 'react'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Sketch } from '@uiw/react-color'
import {
	ArrowUpIcon,
	ArrowUpOnSquareIcon,
	Cog6ToothIcon,
} from '@heroicons/react/20/solid'
import Hovertip from '@/app/components/Hovertip'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { Button } from '@/app/components/ui/button'

type TextFieldProps = {
	label: string
	model: string
	type?: string
}

export const TextField = ({ label, type, model }: TextFieldProps) => {
	return (
		<div className={'flex flex-col gap-2 text-primary'}>
			<Label>{label}</Label>
			<Input
				type={type}
				onChange={(e) => {
					console.log(e.target.files)
				}}
			/>
		</div>
	)
}

export const ColorInput = ({ label, model }: TextFieldProps) => {
	return (
		<div className={'flex items-center justify-between px-4 py-2 text-primary'}>
			<Popover>
				<PopoverTrigger>
					<Hovertip label={'Color Input'}>
						<ArrowUpOnSquareIcon className={'size-6'} />
					</Hovertip>
				</PopoverTrigger>
				<PopoverContent className={'size-auto border-none p-0'}>
					<Sketch />
				</PopoverContent>
			</Popover>
			<Label className={'mx-1 text-base'}>{label}</Label>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className={
							'bg-transparent text-primary hover:bg-primary hover:text-primary-foreground'
						}
					>
						<Hovertip label={'Color Mode'}>
							<Cog6ToothIcon className={'size-5'} />
						</Hovertip>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{label} Custom</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Button>Colorful </Button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
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
