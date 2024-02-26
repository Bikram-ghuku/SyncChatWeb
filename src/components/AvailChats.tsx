'use client'
import React from 'react'
import userData from '@/components/dataFinal.json'
import AvailChatElement from '@/components/AvailChatElement'

function AvailChats() {
	type user = { name: string; url: string, lastMsg: string, lastTime: string }

	return (
		<div className="overflow-y-scroll h-[98%] w-full">
			{userData?.map((Udata: user, index) => (
				<AvailChatElement name={Udata.name} url={Udata.url} lastMsg={Udata.lastMsg} lastTime={Udata.lastTime} id={index} />
			))}
		</div>
	)
}

export default AvailChats
