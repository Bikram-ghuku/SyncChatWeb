'use client'

import Header from '@/components/Header'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
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
		<main className="dark:bg-[#2f3142]">
			<Header />
		</main>
	)
}
