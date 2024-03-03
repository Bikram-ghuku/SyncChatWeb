'use client'
import React from 'react'
import MessageElement from '@/components/MessageElement'

type userData = {name: string, url: string}
function Messages({ chatId }: { chatId: userData }) {
	const message = [
		{
			id: '01',
			message: 'hello there',
			self: false,
			timeStamp: '13:15',
            user: chatId.name,
            url: chatId.url
		},
		{
			id: '02',
			message: 'How its going',
			self: true,
			timeStamp: '13:15',
            user: chatId.name,
            url: chatId.url
		},
	]
	return (
		<div className="w-full overflow-x-hidden overflow-y-scroll h-[72vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			{message?.map((value, index) => (
				<div className="max-h-10 mb-10">
                    
					<MessageElement messageInfo={value} />
				</div>
			))}
		</div>
	)
}

export default Messages
