'use client'
import React from 'react'

type message = { id: string; message: string; self: boolean; timeStamp: string }
function MessageElement({ messageInfo }: { messageInfo: message }) {
	if (messageInfo.self) {
		// self messages
		return (
			<div className="flex justify-end">
				<div className="bg-[#00a3ff] rounded-bl-lg rounded-tl-lg rounded-br-lg w-fit text-end p-2">
					{messageInfo.message}
				</div>
			</div>
		)
	} else {
		//received messages
		return (
			<div className="justify-start bg-[#292929] rounded-bl-lg rounded-tr-lg rounded-br-lg w-fit text-end flex-1 p-2">
				{messageInfo.message}
			</div>
		)
	}
}

export default MessageElement
