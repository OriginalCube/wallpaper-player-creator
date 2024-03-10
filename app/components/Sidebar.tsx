'use client'
import { CodeBracketIcon, Cog6ToothIcon } from '@heroicons/react/20/solid'
import { SidebarActions } from '@/app/components/actions'
import { Label } from '@/app/components/ui/label'
import { useAction } from '@/app/lib/store/useAction'
import { Button } from '@/app/components/ui/button'
import Details from '@/app/components/Details'
import { useState } from 'react'

const Sidebar = () => {
	const [dialog, setDialog] = useState(false)
	const changePreset = useAction((state) => state.updateSongPreset)
	const songDetails = useAction((state) => state.songDetails)
	const addToPlaylist = useAction((state) => state.addToPlaylist)
	const playlist = useAction((state) => state.playlist)

	const handleSubmit = (e: any) => {
		e.preventDefault()
		setDialog(!dialog)
	}

	return (
		<form
			className={'h-full w-1/5 border-r border-primary bg-background'}
			onSubmit={(e) => handleSubmit(e)}
		>
			{dialog && (
				<Details songDetails={songDetails} close={() => setDialog(!dialog)} />
			)}
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
				<div
					className={
						'flex cursor-pointer items-center justify-start gap-4 p-2 text-primary'
					}
				>
					<Cog6ToothIcon className={'size-6'} />
					<Label onClick={changePreset} className={'text-md text-primary'}>
						Change Song Preset
					</Label>
				</div>

				<section className={'flex gap-2'}>
					<Button
						className={'w-full'}
						variant={'outline'}
						onClick={() => console.log('Playlist')}
					>
						Playlist
					</Button>
					<Button type={'submit'} className={'w-full'}>
						Submit
					</Button>
				</section>
			</div>
		</form>
	)
}

export default Sidebar
