'use client'

import ChatLayout from '@/components/ChatLayout'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'

type Props = {
	params: {
		chatId: number
	}
}

export default function ChatPage({ params: { chatId } }: Props) {
	return (
		<main className="dark:bg-[#2f3142] flex flex-col h-screen bg-[#f5f5f5]">
			<Header />
			<ChatLayout chatId={chatId} />
		</main>
	)
}
