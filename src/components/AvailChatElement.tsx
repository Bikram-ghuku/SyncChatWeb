'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

type user = {
	name: string
	url: string
	lastMsg?: string
	lastTime?: string
	id: string
	active: boolean
}

function AvailChatElement(userName: user) {
	return (
		<Link href={'../chat/' + userName.id}>
			<div
				className={
					'h-[6rem] flex hover:bg-[#00a3ff4f] mt-2 pl-3 rounded-sm ' +
					(userName.active ? 'bg-[#00a3ff4f]' : '')
				}
			>
				<Avatar className="h-[4rem] w-[4rem] mt-5">
					<AvatarFallback>C</AvatarFallback>
					<AvatarImage src={userName.url} />
				</Avatar>
				<div className="mt-8 ml-4 w-1/2">
					<div className="font-semibold">{userName.name}</div>
					<div className="pt-2 font-extralight">{userName.lastMsg}</div>
				</div>
				<div className="mt-8 flex justify-end w-1/4 mr-4">
					{userName.lastTime}
				</div>
			</div>
		</Link>
	)
}

export default AvailChatElement
