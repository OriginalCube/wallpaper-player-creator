'use client'
import { CodeBracketIcon, Cog6ToothIcon } from '@heroicons/react/20/solid'
import { SidebarActions } from '@/app/components/actions'
import { Label } from '@/app/components/ui/label'
import { useAction } from '@/app/lib/store/useAction'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Simulate } from 'react-dom/test-utils'

const Sidebar = () => {
	const changePreset = useAction((state) => state.updateSongPreset)
	const songDetails = useAction((state) => state.songDetails)
	const addToPlaylist = useAction((state) => state.addToPlaylist)
	const playlist = useAction((state) => state.playlist)

	useEffect(() => {
		console.log(playlist)
	}, [playlist])

	return (
		<div className={'h-full w-1/5 border-r border-primary bg-background'}>
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

				<Dialog>
					<DialogTrigger
						className={'rounded-md bg-primary p-2 text-primary-foreground'}
					>
						Submit
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>Song Details</DialogHeader>
						<DialogDescription className={'flex flex-col gap-2'}>
							<span className={'text-primary'}>
								Name: <span className={'font-medium'}>{songDetails.name}</span>
							</span>
						</DialogDescription>
						<DialogFooter>
							<Button>Cancel</Button>
							<Button onClick={() => addToPlaylist()}>Submit</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

export default Sidebar
