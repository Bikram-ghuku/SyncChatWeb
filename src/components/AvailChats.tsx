'use client'
import React, { useContext } from 'react'
import userData from '@/components/dataFinal.json'
import AvailChatElement from '@/components/AvailChatElement'
import { ChannelContext } from '@/provider/channelProvider'

function AvailChats({ active }: { active?: number }) {
	type user = { name: string; url: string; lastMsg?: string; lastTime?: string; userId: string }
	const Channels = useContext(ChannelContext)

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
			{Channels?.map((Udata: user, index) => (
				<AvailChatElement
					name={Udata.name}
					url={''}
					lastMsg={Udata.lastMsg}
					lastTime={Udata.lastTime}
					id={Udata.userId}
					active={index == active}
				/>
			))}
		</div>
	)
}

export default AvailChats
