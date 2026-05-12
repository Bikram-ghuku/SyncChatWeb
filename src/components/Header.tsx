'use client'
import React, { useEffect, useState } from 'react'
import DarkToggler from './DarkToggler'
import UserButton from './UserButton'
import ChatsButton from './ChatsButton'
import GetChats from '@/components/GetChats'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

function Header() {
	const [profUrl, setProfUrl] = useState<string>(
		'https://github.com/shadcn.png'
	)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}
		const jwtToken = window.localStorage.getItem('jwt')
		setIsLoggedIn(Boolean(jwtToken))
		const userDataStr = window.localStorage.getItem('name')
		if (userDataStr) {
			const userData = JSON.parse(userDataStr)
			if (userData?.url) {
				setProfUrl(userData.url)
			}
		}
	}, [])

	const logOut = () => {
		window.localStorage.clear()
		setIsLoggedIn(false)
		setProfUrl('https://github.com/shadcn.png')
	}
	return (
		<header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-[#5e5e5e33] dark:border-[#303030]">
			<nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
				<div className="flex-1 flex items-center justify-start space-x-4">
					<Link href={'./'}>
						<Image src="/icon.png" alt="ChatSync" width="40" height="40" />
					</Link>
				</div>
				<div className="flex-1 flex items-center justify-end space-x-4">
					<ChatsButton />
					<GetChats />
					<DarkToggler />
					{isLoggedIn ? (
						<UserButton url={profUrl} logout={logOut} />
					) : (
						<Link href="/login">
							<Button variant="ghost">Login</Button>
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header
