'use client'
import React from 'react'
import UserAvatar from '@/components/UserAvatar'
type message = {
	id: string
	message: string
	self: boolean
	timeStamp: string
	user: string
	url: string
}
function MessageElement({ messageInfo }: { messageInfo: message }) {
	if (messageInfo.self) {
		// self messages
		const selfData = JSON.parse(localStorage.getItem('name')!)
		return (
			<div className="flex justify-end">
				<div className="flex flex-col mr-2">
					<div className="flex flex-row-reverse gap-3 text-[0.75rem] mb-1">
						<div>{selfData.name}</div>
						<div>{messageInfo.timeStamp}</div>
					</div>
					<div className="bg-[#00a3ff] rounded-bl-lg rounded-tl-lg rounded-br-lg w-fit text-end p-2 text-white max-w-[25vw] self-end break-words h-auto">
						{messageInfo.message}
					</div>
				</div>
				<UserAvatar url="" />
			</div>
		)
	} else {
		//received messages
		return (
			<div className="flex w-fit">
				<div>
					<UserAvatar url={messageInfo.url} />
				</div>
				<div className="flex flex-col ml-5">
					<div className="flex flex-row gap-3 mb-1">
						<div className="text-[0.75rem]">{messageInfo.user}</div>
						<div className="text-[0.75rem]">{messageInfo.timeStamp}</div>
					</div>
					<div className="dark:bg-[#292929] rounded-bl-lg rounded-tr-lg rounded-br-lg w-fit text-end flex-1 p-2 bg-white max-w-[25vw] self-end break-words">
						{messageInfo.message}
					</div>
				</div>
			</div>
		)
	}
}

export default MessageElement
