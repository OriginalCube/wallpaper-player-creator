'use client'
import React from 'react'
import { CodeBracketIcon } from '@heroicons/react/20/solid'
import { SidebarActions } from '@/app/components/actions'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { useAction } from '@/app/lib/store/useAction'

const Sidebar = () => {
	const changePreset = useAction((state) => state.updateSongPreset)

	return (
		<div className={'h-full w-1/4 border-r border-primary bg-background'}>
			<div
				className={
					'flex size-auto items-center gap-6 border-b-2 border-primary p-2 px-4 text-primary'
				}
			>
				<CodeBracketIcon className={'h-10 w-10'} />
				<p className={'text-2xl font-medium'}>Wallpaper Creator</p>
			</div>
			<div className={'flex flex-col gap-4 p-4'}>
				<SidebarActions />
				<div>
					<Label onClick={changePreset} className={'text-md text-primary'}>
						Change Song Preset
					</Label>
				</div>
				<Button>Submit</Button>
			</div>
		</div>
	)
}

export default Sidebar
