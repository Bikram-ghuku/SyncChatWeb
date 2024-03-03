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
	console.log(chatId)
	interface Chat {
		id: string
		members: string[]
	}
	const [chats, setChats] = useState<Chat[]>([])

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_API_URL + '/channels/channels', {
			method: 'GET',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		})
			.then(res => res.json())
			.then(data => {
				setChats(data)
			})
	}, [])
	return (
		<main className="dark:bg-[#2f3142] flex flex-col h-screen bg-[#f5f5f5]">
			<Header />
			<ChatLayout chatId={chatId} />
		</main>
	)
}
