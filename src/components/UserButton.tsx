'use client'

import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from './UserAvatar'

function UserButton({ url, logout }: { url: string; logout: () => void }) {
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar url={url} />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{/* <DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuSeparator /> */}
					<DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default UserButton
