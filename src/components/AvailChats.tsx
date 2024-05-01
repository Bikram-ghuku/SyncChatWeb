'use client'
import React, { useContext, useState } from 'react'
import AvailChatElement from '@/components/AvailChatElement'
import { ChannelContext, user } from '@/provider/channelProvider'
import { LoadingSpinner } from '@/components/Spinner'
import { socketContext } from '@/provider/socketProvider'

function AvailChats({ active }: { active?: string }) {
	const { userDet, isLoad} = useContext(ChannelContext)
	

	const socket = useContext(socketContext)
	
	if(isLoad){
		return(
			<div className=' w-full items-center flex justify-center h-full'>
				<LoadingSpinner size={100}/>
			</div>
		)
	}
	const [channels, setChannels] = useState<user[]>(userDet);
	socket.on('message', (data) => {
		if(channels.find((user) => user.chanId === data.chatId) != undefined){
			var res: user[] = [];
			for(var i = 0; i < channels.length; i++){
				if(channels[i].chanId === data.chatId){
					channels[i].lastMsg = data.msg
					res.push(channels[i])
				}else{
					res.push(channels[i])
				}
			}
			setChannels(res)
		}
	})
	return (
		<div className="overflow-y-scroll h-[98%] w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pl-5 pr-5">
			{channels.length === 0 && (
				<div className="pl-3 text-center pr-4">
					<div>
						Start by adding a new person to chat with by clicking the add chat
						option in the header
					</div>
				</div>
			)}
			{channels?.map((Udata: user, index) => (
				<AvailChatElement
					name={Udata.name}
					url={Udata.url}
					lastMsg={Udata.lastMsg}
					lastTime={Udata.lastOnline}
					id={Udata.chanId}
					active={Udata.chanId == active}
				/>
			))}
		</div>
	)
}

export default AvailChats
