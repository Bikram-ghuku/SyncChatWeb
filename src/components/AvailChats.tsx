'use client'
import React, { useContext, useState, useEffect } from 'react'
import AvailChatElement from '@/components/AvailChatElement'
import { ChannelContext, user } from '@/provider/channelProvider'
import { LoadingSpinner } from '@/components/Spinner'
import { socketContext } from '@/provider/socketProvider'
import axios from 'axios'
import { MessageSquarePlus } from 'lucide-react'

function AvailChats({ active }: { active?: string }) {
	const [userData, setUserData] = useContext(ChannelContext)!

	const socket = useContext(socketContext)
	const [channels, setChannels] = useState<user[]>([])
	const [isLoad, setIsLoad] = useState<Boolean>(true)

	useEffect(() => {
		if (userData == undefined) {
			if (localStorage.getItem('jwt')) {
				axios
					.get(process.env.NEXT_PUBLIC_API_URL + '/channels/channels', {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('jwt')}`,
						},
					})
					.then(data => {
						if (data.status == 200) {
							const userDetData: user[] = data.data
							setUserData(userDetData)
							setIsLoad(false)
							setChannels(userDetData)
						}
					})
			}
		} else {
			setChannels(userData)
			setIsLoad(false)
		}
	}, [])

	if (isLoad) {
		return (
			<div className=" w-full items-center flex justify-center h-full">
				<LoadingSpinner size={100} />
			</div>
		)
	}
	socket.on('message', data => {
		var x = channels.findIndex(user => user.chanId === data.chatId)
		if(x != -1){
			const updateChan:user = {...channels[x], lastMsg: data.msg, noUnread: channels[x].noUnread + 1}
			const newChan = [...channels];
			newChan[x] = updateChan
			setChannels(newChan)
			setUserData(newChan)
		}
	})
	return (
		<div className="overflow-y-scroll h-[98%] w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pl-5 pr-5">
			{channels.length === 0 && (
				<div className="pl-3 text-center pr-4">
					<div>
						Start by adding a new person to chat with by clicking the add chat
						option in the header, &quot;Bikram-ghuku&quot; to messsage developer
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
					key={index}
					noUnread={Udata.noUnread}
					onClick={() => {channels[index].noUnread = 0}}
				/>
			))}
		</div>
	)
}

export default AvailChats
