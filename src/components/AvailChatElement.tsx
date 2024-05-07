'use client'
import React, { MouseEventHandler, useState } from 'react'
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
	noUnread: number
	onClick: MouseEventHandler
}

function AvailChatElement(userName: user) {
	const [lastMsgDecp, setLastMsgDecp] = useState<string>()
	decryptSymmetric(userName.lastMsg || '').then(data => {
		setLastMsgDecp(data)
	})
	return (
		<Link href={'/chat/[chatId]'} id={userName.id} as={`/chat/${userName.id}`} onClick={userName.onClick}>
			<div
				className={
					'h-[6rem] flex mt-2 pl-3 rounded-sm ' +
					(userName.active ? 'bg-[#00a3ff4f]' : 'hover:bg-[#00a3ff18]')
				}
			>
				<Avatar className="h-[4rem] w-[4rem] mt-5">
					<AvatarFallback>C</AvatarFallback>
					<AvatarImage src={userName.url} />
				</Avatar>
				<div className="mt-6 ml-4 w-3/4">
					<div className="font-semibold text-lg">{userName.name}</div>
					<div className="pt-2 font-light text-sm overflow-hidden h-8">
						{lastMsgDecp}
					</div>
				</div>
				{userName.noUnread > 0 &&
				(<div className='flex mr-10 items-center'>
					<div className=' bg-blue-500 w-8 h-8 rounded-full flex justify-center items-center'>
						{userName.noUnread}
					</div>
				</div>)}
			</div>
		</Link>
	)
}

export default AvailChatElement
