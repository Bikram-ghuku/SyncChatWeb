'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type user = { name: string; url: string, lastMsg: string, lastTime: string }

function AvailChatElement(userName: user) {
	return (
		<div className="h-[6rem] flex mt-5">
			<Avatar className="h-[5rem] w-[5rem] mt-5">
				<AvatarFallback>C</AvatarFallback>
				<AvatarImage src={userName.url} />
			</Avatar>
			<div className="mt-8 ml-4 w-1/2">
				<div className="font-black">{userName.name}</div>
				<div className="pt-2 font-extralight">{userName.lastMsg}</div>
			</div>
			<div className="mt-8 flex justify-end w-1/4 mr-4">{userName.lastTime}</div>
		</div>
	)
}

export default AvailChatElement
