'use client'
import React from 'react'
import userData from '@/components/dataFinal.json'
import AvailChatElement from '@/components/AvailChatElement'
import { MessageSquarePlus } from 'lucide-react'

function AvailChats({ active }: { active?: number }) {
	type user = { name: string; url: string; lastMsg?: string; lastTime?: string }

	return (
		<div className="overflow-y-scroll h-[98%] w-full">
			{userData.length === 0 && (
				<div className='pl-3 text-center pr-4'>
					<div>Start by adding a new person to chat with by clicking the add chat option in the header</div>
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
