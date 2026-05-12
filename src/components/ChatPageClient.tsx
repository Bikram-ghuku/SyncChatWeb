'use client'

import Header from '@/components/Header'
import React from 'react'
import SearchArea from '@/components/SearchArea'
import AvailChats from '@/components/AvailChats'
import ChatLayout from '@/components/ChatLayout'
import { useSearchParams } from 'next/navigation'

function ChatHomePage() {
	const searchParams = useSearchParams()
	const chatId = searchParams.get('id')

	if (chatId) {
		return (
			<main className="dark:bg-gray-800 flex flex-col h-screen bg-[#f5f5f5]">
				<Header />
				<ChatLayout chatId={chatId} />
			</main>
		)
	}

	return (
		<div className="h-screen w-screen">
			<Header />
			<div className="flex flex-col dark:bg-gray-900 bg-[#ffffff] border-r-2 border-[#5E5E5E33] dark:border-[#303030] w-full mt-2 rounded-md messageEle ml-2">
				<style jsx>{`
					.messageEle {
						height: calc(100vh - 108px);
						width: 25%;
					}
					@media screen and (max-width: 1080px) {
						.messageEle {
							height: calc(100vh - 100px);
							width: calc(100vw - 16px);
						}
					}
					@media screen and (max-width: 640px) {
						.messageEle {
							height: calc(100vh - 148px);
							width: calc(100vw - 16px);
						}
					}
				`}</style>

				<div className="flex h-[4%] w-full flex-col pt-5 pl-5 pr-2">
					<SearchArea />
				</div>

				<div className="flex flex-1 h-[96%] w-full h-max-[96%] mt-10 flex-col">
					<AvailChats />
					<div className="w-full flex justify-center mt-6 mb-2">
						&#169; 2024 under Bikram Ghuku
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatHomePage
