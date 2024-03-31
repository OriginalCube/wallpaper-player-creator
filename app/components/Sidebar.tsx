'use client'
import { CodeBracketIcon, Cog6ToothIcon } from '@heroicons/react/20/solid'
import { SidebarActions } from '@/app/components/actions'
import { Label } from '@/app/components/ui/label'
import { useAction } from '@/app/lib/store/useAction'
import { Button } from '@/app/components/ui/button'
import { useModal } from '@/app/lib/store/useModal'
import { toast } from 'sonner'
import { download } from '@/app/lib/useDownload'
import { useEffect } from 'react'

const Sidebar = () => {
	const changePreset = useAction((state) => state.updateSongPreset)
	const openModal = useModal((state) => state.openModal)
	const playlist = useAction((state) => state.playlist)
	const resetPlaylist = useAction((state) => state.resetPlaylist)

	const openPlaylist = () => {
		if (playlist.length > 0) openModal('playlist')
		else toast.warning('No songs added in the playlist yet.')
	}

	const handleSubmit = (e: any) => {
		openModal('details')
		e.preventDefault()
	}

	const handleDownload = async () => {
		if (playlist.length === 0) {
			toast.warning('No songs added yet in the playlist!')
			return
		}

		// @ts-ignore *-*
		const result = await download(playlist)
		if (result) {
			toast.success('Songs downloaded!')
			resetPlaylist()
		} else
			toast.warning(
				'There has been an error downloading your file, please try again.',
			)
	}

	useEffect(() => {
		console.log(playlist)
	}, [playlist])

	return (
		<form
			className={'h-full w-1/5 border-r border-primary bg-background'}
			onSubmit={(e) => handleSubmit(e)}
		>
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
					onClick={changePreset}
				>
					<Cog6ToothIcon className={'size-6'} />
					<Label className={'text-md cursor-pointer text-primary'}>
						Change Song Preset
					</Label>
				</div>

				<section className={'flex gap-2'}>
					<Button
						className={'w-full'}
						variant={'outline'}
						type={'button'}
						onClick={openPlaylist}
					>
						Playlist
					</Button>
					<Button type={'submit'} variant={'outline'} className={'w-full'}>
						Submit
					</Button>
				</section>
				<Button onClick={handleDownload} type={'button'}>
					Download
				</Button>
			</div>
		</form>
	)
}

export default Sidebar
