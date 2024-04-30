'use client'

import React, { useContext } from 'react'
import SearchArea from '@/components/SearchArea'
import InputArea from '@/components/InputArea'
import UserAvatar from '@/components/UserAvatar'
import CallOptions from '@/components/CallOptions'
import AvailChats from '@/components/AvailChats'
import Messages from '@/components/Messages'
import { ChannelContext, user } from '@/provider/channelProvider'

function ChatLayout({ chatId }: { chatId: string }) {
	
	const channels:user[] = useContext(ChannelContext);
	const userData = channels.find((user) => user.chanId == chatId)
	return (
		<div className="flex flex-1">
			<div className="lg:flex flex-col lg:w-1/4 dark:bg-gray-900 bg-[#ffffff] border-r-2 border-[#5E5E5E33] dark:border-[#303030] w-full rounded-md h-[98%] hidden">
				<div className="flex h-[4%] w-full flex-col pt-5 pl-5 pr-2">
					{/* Seatch and app name*/}
					<SearchArea />
				</div>
				<div className="flex h-full w-full h-max-[96%] mt-10 flex-col">
					<AvailChats active={chatId} />
					<div className="w-full flex justify-center mt-6 mb-2">
						&#169; 2024 under Bikram Ghuku
					</div>
				</div>
			</div>
			<div className="flex lg:w-3/4 flex-col w-full m-1">
				<div className="flex dark:bg-gray-900 w-full bg-[#ffffff] h-16 border-b-2 border-[#5E5E5E33] dark:border-[#303030]">
					<div className="flex justify-start pl-10 items-center h-full">
						<UserAvatar url={userData?.url || ''} />
					</div>
					<div className="w-full h-full pl-4 flex items-center lg:font-extrabold font-semibold">
						{userData?.name}
					</div>
					<div className="flex justify-end pl-10 items-center h-full w-full lg:pr-20">
						<CallOptions />
					</div>
				</div>
				<div className="flex h-full w-full p-5">
					<Messages chatId={chatId} userDetails={userData!}/>
				</div>
				<div className="flex dark:bg-gray-900 w-full bg-[#ffffff] h-16 border-t-2 border-[#5E5E5E33] dark:border-[#303030]">
					<InputArea chatId={userData?.chanId || ""} />
				</div>
			</div>
		</div>
	)
}

export default ChatLayout
