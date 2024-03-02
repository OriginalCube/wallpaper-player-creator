import React from 'react'
import Sidebar from '@/app/components/Sidebar'
import Main from '@/app/components/edit/Main'

const page = () => {
	return (
		<main className={'flex h-screen w-full bg-background'}>
			<Sidebar />
			<Main />
		</main>
	)
}

export default page
