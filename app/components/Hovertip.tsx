import React from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'

type HovertipProps = {
	children: React.ReactElement
	label: string
	side?: 'bottom' | 'left' | 'right' | 'top'
}

const Hovertip = ({ children, label, side }: HovertipProps) => {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild className={'cursor-pointer'}>
					{children}
				</TooltipTrigger>
				<TooltipContent
					side={side ?? 'bottom'}
					className={'border border-secondary'}
				>
					<Label>{label}</Label>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default Hovertip
