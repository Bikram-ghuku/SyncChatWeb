'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

type user = {
	name: string
	url: string
	lastMsg: string
	lastTime: string
	id: number
	active: boolean
}

function AvailChatElement(userName: user) {
	return (
		<Link href={'../chat/' + userName.id}>
			<div
				className={
					'h-[7rem] flex mt-5 hover:bg-[#00a3ff4f] ' +
					(userName.active ? 'bg-[#00a3ff4f]' : '')
				}
			>
				<Avatar className="h-[5rem] w-[5rem] mt-5">
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
