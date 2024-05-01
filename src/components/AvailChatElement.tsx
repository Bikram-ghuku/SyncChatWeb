'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { decryptSymmetric } from '@/encryption/Controller'

type user = {
	name: string
	url: string
	lastMsg?: string
	lastTime?: string
	id: string
	active: boolean
}

function AvailChatElement(userName: user) {
	const [lastMsgDecp, setLastMsgDecp] = useState<string>()
	decryptSymmetric(userName.lastMsg || '').then((data) => {
		setLastMsgDecp(data)
	})
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
				<div className="mt-6 ml-4 w-1/2">
					<div className="font-semibold text-lg">{userName.name}</div>
					<div className="pt-2 font-light text-sm">{lastMsgDecp}</div>
				</div>
				<div className="mt-8 flex justify-end w-1/4 mr-4">
					{userName.lastTime}
				</div>
			</div>
		</Link>
	)
}

export default AvailChatElement
