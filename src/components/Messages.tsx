'use client'
import React, { useEffect, useRef } from 'react'
import MessageElement from '@/components/MessageElement'

type userData = { name: string; url: string }
function Messages({ chatId }: { chatId: userData }) {
	const messaChaRef = useRef<null | HTMLDivElement>(null)
	const message = [
		{
			id: '01',
			message: 'Hello there',
			self: false,
			timeStamp: '13:15',
			user: chatId.name,
			url: chatId.url,
		},
		{
			id: '02',
			message: "How's it going",
			self: true,
			timeStamp: '13:15',
			user: chatId.name,
			url: chatId.url,
		},
	]
	useEffect(() => {
		messaChaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [])

	return (
		<div className="w-full overflow-x-hidden overflow-y-scroll h-[72vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			{message?.map((value, index) => (
				<div className="max-h-10 mb-10">
					<MessageElement messageInfo={value} />
					<div ref={messaChaRef} />
				</div>
			))}
		</div>
	)
}

export default Messages
