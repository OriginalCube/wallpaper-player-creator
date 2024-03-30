import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { HeartIcon } from '@heroicons/react/24/solid'
import { FolderPlusIcon } from '@heroicons/react/24/solid'

export default function Home() {
	return (
		<main
			className={
				'theme-custom flex min-h-screen items-center justify-center gap-4 bg-white text-black'
			}
		>
			<div className={'flex w-1/2 flex-col gap-4'}>
				<p className={'text-7xl font-medium '}>Wallpaper Creator v1.0</p>
				<p className={'w-11/12 text-2xl font-light leading-10'}>
					Start creating custom wallpaper now! This is still in a beta version
					so changes or bugs can appear. If those issue occurs please create an
					issue in Github and let me know about it.
				</p>
				<div className={'mt-4 flex items-center justify-evenly'}>
					<Link
						target={'_blank'}
						href={'https://steamcommunity.com/id/OriginalCube/myworkshopfiles/'}
					>
						<Button className={'text-white'}>
							<HeartIcon className={'mr-2 size-4'} /> Donate
						</Button>
					</Link>
					<Link
						target={'_blank'}
						href={'https://github.com/OriginalCube/WE-custom-player'}
					>
						<Button className={'text-white'}>
							<GitHubLogoIcon className={'mr-2 size-4'} />
							Contribute
						</Button>
					</Link>
					<Link key={'edit'} href={'/edit'}>
						<Button className={'text-white'}>
							<FolderPlusIcon className={'mr-2 size-4'} />
							Start Creating Now
						</Button>
					</Link>
				</div>
			</div>
			<Image
				src={'/images/Engine_Logo.gif'}
				height={500}
				width={500}
				alt={''}
			/>
		</main>
	)
}
