'use client'

import React from 'react'
import SearchArea from '@/components/SearchArea'
import Image from 'next/image'

function ChatLayout() {
	return (
		<div className="flex flex-1">
			<div className="flex flex-col w-1/4 dark:bg-gray-900 bg-[#ffffff]">
				<div className="flex h-1/6 w-full flex-col pt-5 pl-5">
					{/* Seatch and app name*/}
					<div className="flex flex-row pb-5 pl-5 pr-10">
                        <Image src="/icon.png" alt="ChatSync" width="50" height="50" objectFit='cover' />
						<div className="font-extrabold lg:text-5xl text-center lg:pl-10 text-[#00A3FF] text-xl pl-5">
							Sync Chat
						</div>
					</div>
					<SearchArea />
				</div>
				<div className="flex h-5/6 w-full">{/* Contacts and names*/}</div>
			</div>
			<div className="flex w-3/4"></div>
		</div>
	)
}

export default ChatLayout
