import React, { useEffect, useState } from 'react'
import { Image } from 'next/image'
import { BackwardIcon, ForwardIcon, PlayIcon } from '@heroicons/react/20/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { LoopIcon } from '@radix-ui/react-icons'
import { Slider } from '@/app/components/ui/slider'

// const Visualizer = () => {
// 	const songDetails = useCreate((state) => state.songDetails)
// 	const height = Math.random() * 100
// 	const width = 125 / 15
// 	return (
// 		<div
// 			className={'bg-slate-400'}
// 			style={{
// 				height: height,
// 				width: width,
// 				backgroundColor: songDetails.foreground,
// 			}}
// 		></div>
// 	)
// }

const Main = () => {
	// const songDetails = useCreate((state) => state.songDetails)
	//
	// const lines = []
	// for (let i = 0; i < 32; i++) {
	// 	lines.push(<Visualizer />)
	// }

	return (
		<>
			<div className={'h-full w-2/6'}></div>
			<div className={'flex h-full w-3/6 flex-col items-center'}>
				<div className={'flex h-[125px] w-[600px] items-end justify-between'}>
					{/*{lines}*/}
				</div>
				{/*<Image />*/}
				<div className={'flex h-1/6 w-[600px] items-center justify-center'}>
					<div className={'flex h-auto w-full flex-col items-center gap-4'}>
						<p
							className={'text-white'}
							// style={{ textShadow: `1px 1px 6px ${songDetails.textColor}` }}
						>
							{/*{songDetails.name}*/}
						</p>
						<Slider
							className={'w-4/5 rounded-md'}
							defaultValue={[33]}
							max={100}
							step={1}
							// style={{ background: songDetails.background }}
						/>
						<div className={'flex w-full items-center justify-center gap-8'}>
							<LoopIcon className={'size-6 cursor-pointer text-white'} />
							<BackwardIcon className={'size-6 cursor-pointer text-white'} />
							<PlayIcon className={'size-8 cursor-pointer text-white'} />
							<ForwardIcon className={'size-6 cursor-pointer text-white'} />
							<HeartIcon className={'size-6 cursor-pointer text-white'} />
						</div>
					</div>
				</div>
			</div>
			<div className={'h-full w-2/6'}></div>
		</>
	)
}

export default Main
