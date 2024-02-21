'use client'
import React from 'react'
import DarkToggler from './darkToggler'
import UserButton from './UserButton'

function Header() {
	return (
		<header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
			<nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
				<div className="flex-1 flex items-center justify-end space-x-4">
					<DarkToggler />
					<UserButton />
				</div>
			</nav>
		</header>
	)
}

export default Header
