'use client'

import React from 'react'
import SearchArea from '@/components/SearchArea'
import InputArea from '@/components/InputArea'

function ChatLayout() {
	return (
		<div className="flex flex-1">
			<div className="flex flex-col w-1/6 dark:bg-gray-900 bg-[#ffffff]">
				<div className="flex h-1/6 w-full flex-col pt-5 pl-5 pr-2">
					{/* Seatch and app name*/}
					<SearchArea />
				</div>
				<div className="flex h-4/5 w-full">{/* Contacts and names*/}</div>
			</div>
			<div className="flex w-5/6 flex-col">
				<div className="flex h-full w-full"></div>
				<div className="flex dark:bg-gray-900 w-full bg-[#ffffff] h-16">
					<InputArea />
				</div>
			</div>
		</div>
	)
}

export default ChatLayout
