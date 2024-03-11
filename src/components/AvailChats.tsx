'use client'
import React, { useEffect, useState } from 'react'
import userData from '@/components/dataFinal.json'
import AvailChatElement from '@/components/AvailChatElement'
import { MessageSquarePlus } from 'lucide-react'

function AvailChats({ active }: { active?: number }) {
	type user = { name: string; url: string; lastMsg?: string; lastTime?: string }
	const [userData, setUserData] = useState<user[]>([]);

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_API_URL+'/channels/channels', {
			method: 'GET',
			headers:{
				'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
			}
		}).then(data => data.json()).then((data) => {
			if(data.length !== 0) setUserData(data)
			console.log(data)
		})
	}, [])

	return (
		<div className="overflow-y-scroll h-[98%] w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			{userData.length === 0 && (
				<div className="pl-3 text-center pr-4">
					<div>
						Start by adding a new person to chat with by clicking the add chat
						option in the header
					</div>
				</div>
			)}
			{userData?.map((Udata: user, index) => (
				<AvailChatElement
					name={Udata.name}
					url={Udata.url}
					lastMsg={Udata.lastMsg}
					lastTime={Udata.lastTime}
					id={index}
					active={index == active}
				/>
			))}
		</div>
	)
}

export default AvailChats
