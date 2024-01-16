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
			<div className='h-[6vh] w-[100vw] bg-[#1AA7EC]'></div>
			<div id="bottomMain" className='h-[90vh] w-[100vw]'>
				<div id="bottomLeft" className='h-[100%] w-[30vw] overflow-x-hidden overflow-y-auto border-solid border-r-2 border-[#C8C8C8] pr-1'>
					{chats.map((chat, index) => {
						return (
							<div key={index} className='flex flex-row items-center justify-start h-[10vh] w-[100%] border-solid border-b-2 border-[#D8D8D8] mt-2 cursor-pointer' onClick={() => console.log(chat.id)}>
								<div className='h-[10vh] w-[20vw] font-szie-10 pt-5'>{chat.members.length === 2 ? <FaUserLarge size={50}/> : <FaUsers size={50}/>}</div>
							</div>
						)
					})}
				</div>
				<div id="bottomRight"></div>
			</div>
			<div className='h-[4vh] w-[100vw] text-center border-t-2 border-solid border-[#C8C8C8]'>
				Copyright Bikram Ghuku 2023. All rights reserved.
			</div>
		</main>
	)
}
