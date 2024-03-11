import React from 'react'
import Sidebar from '@/app/components/Sidebar'
import Main from '@/app/components/edit/Main'
import Modal from '@/app/components/Modal'

const page = () => {
	return (
		<main className={'flex h-screen w-full bg-background'}>
			<Modal />
			<Sidebar />
			<Main />
		</main>
	)
}

export default page
