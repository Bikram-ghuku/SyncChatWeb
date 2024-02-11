"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaUsers, FaUserLarge } from "react-icons/fa6";


export default function Home() {
	interface Chat {
		id: string,
		members: string[]
	}
	const [chats, setChats] = useState<Chat[]>([])

	useEffect(() => {
	
		fetch(process.env.NEXT_PUBLIC_API_URL+'/channels/channels', {
			method: 'GET',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('token')
			}

		}).then(res => res.json()).then(data => {
			setChats(data)
		})

	}, [])
	return (
		<main className="">
			<div className='h-[100vh] bg-[#202022] flex'>
				<div className='w-[5vw] h-[100vh] flex-auto pr-1'></div>
				<div className='w-[80vw] h-[98vh] bg-[#f9fafc] flex-auto mr-2 rounded-3xl mt-2 mb-2'></div>
				<div className='w-[20vw] h-[100vh] flex-auto flex flex-col'>
					<div className='w-[18vw] h-[49vh] bg-[#f9fafc] rounded-3xl mb-1 mt-2'></div>
					<div className='w-[18vw] h-[48vh] bg-[#f9fafc] rounded-3xl mt-1'></div>
				</div>
			</div>
		</main>
	)
}
