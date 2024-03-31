import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/app/components/ui/sonner'
import React from 'react'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className={'theme-custom'}>
					<Head>
						<title>Wallpaper Creator</title>
					</Head>
					{children}
					<Toaster />
				</div>
			</body>
		</html>
	)
}
