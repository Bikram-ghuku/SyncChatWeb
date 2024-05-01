'use client'
import React, { useContext } from 'react'
import AvailChatElement from '@/components/AvailChatElement'
import { ChannelContext, user } from '@/provider/channelProvider'
import { LoadingSpinner } from '@/components/Spinner'

function AvailChats({ active }: { active?: string }) {
	const { userDet, isLoad} = useContext(ChannelContext)
	const Channels = userDet
	if(isLoad){
		return(
			<div className=' w-full items-center flex justify-center h-full'>
				<LoadingSpinner size={100}/>
			</div>
		)
	}
	return (
		<div className="overflow-y-scroll h-[98%] w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pl-5 pr-5">
			{Channels.length === 0 && (
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
					url={Udata.url}
					lastMsg={Udata.lastMsg}
					lastTime={Udata.lastTime}
					id={Udata.chanId}
					active={Udata.chanId == active}
				/>
			))}
		</div>
	)
}

export default AvailChats
