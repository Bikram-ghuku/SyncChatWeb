'use client'
import React from 'react'
import DarkToggler from './DarkToggler'
import UserButton from './UserButton'
import ChatsButton from './ChatsButton'
import GetChats from './GetChats'
import Image from 'next/image'

function Header() {
	return (
		<header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-[#5e5e5e33] dark:border-[#303030]">
			<nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
				<div className="flex-1 flex items-center justify-start space-x-4">
					<Image src="/icon.png" alt="ChatSync" width="40" height="40" />
				</div>
				<div className="flex-1 flex items-center justify-end space-x-4">
					<ChatsButton />
					<GetChats />
					<DarkToggler />
					<UserButton url='https://github.com/shadcn.png'/>
				</div>
			</nav>
		</header>
	)
}

export default Header
