'use client'
import React from 'react'
import UserAvatar from '@/components/UserAvatar'
type message = { id: string; message: string; self: boolean; timeStamp: string; user: string, url: string }
function MessageElement({ messageInfo }: { messageInfo: message }) {
	if (messageInfo.self) {
		// self messages
		return (
			<div className="flex justify-end">
                <div className='flex flex-col  mr-2'>
                    <div className='flex flex-row-reverse gap-7 text-[0.75rem] mb-1'>
                        <div>User</div>
                        <div>{messageInfo.timeStamp}</div>
                    </div>
                    <div className="bg-[#00a3ff] rounded-bl-lg rounded-tl-lg rounded-br-lg w-fit text-end p-2">
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
                <div className='flex flex-col ml-5'>
                    <div className='flex flex-row gap-7 mb-1'>
                        <div className='text-[0.75rem]'>
                            {messageInfo.user}
                        </div>
                        <div className='text-[0.75rem]'>
                            {messageInfo.timeStamp}
                        </div>
                    </div>
                    <div className="bg-[#292929] rounded-bl-lg rounded-tr-lg rounded-br-lg w-fit text-end flex-1 p-2">
                        {messageInfo.message}
                    </div>
                </div>
			</div>
		)
	}
}

export default MessageElement
