'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function UserAvatar({ url }: { url: string }) {
	return (
		<div>
			<Avatar>
				<AvatarImage src={url} />
				<AvatarFallback>U</AvatarFallback>
			</Avatar>
		</div>
	)
}

export default UserAvatar
