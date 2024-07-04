'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageElement from '@/components/MessageElement'
import { socketContext } from '@/provider/socketProvider'
import { decryptSymmetric } from '@/encryption/Controller'
import axios from 'axios'
import { LoadingSpinner } from './Spinner'
import { ChannelContext } from '@/provider/channelProvider'

type userData = { name: string; url: string }
type msgData = {
	id: string
	message: string
	self: boolean
	timeStamp: string
	user: string
	url: string
	isRead: boolean
}
function Messages({
	chatId,
	userDetails,
}: {
	chatId: string
	userDetails: userData
}) {
	const socket = useContext(socketContext)
	const messaChaRef = useRef<null | HTMLDivElement>(null)
	const [message, setMessage] = useState<msgData[]>([])
	const [userData, setUserData] = useContext(ChannelContext)!
	const [isLoaading, setIsLoading] = useState<boolean>(true)
	const [multi, setMulti] = useState<number>(0);
	const msgAreaRef = useRef<HTMLDivElement>(null)
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

	useEffect(() => {
		if (localStorage.getItem('jwt')) {
			setIsFetching(true)
			axios
				.post(
					process.env.NEXT_PUBLIC_API_URL + '/message/getMsgs',
					{
						chatId: chatId,
						multi: multi
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('jwt')}`,
						},
					}
				)
				.then(data => {
					const resData = data.data
					if(resData.length === 0){
						setIsFetching(false)
						setIsLoading(false)
					}
					const decryptedMessages: msgData[] = [];
					for (const x of resData) {
						const { id, msgs, self, TimeStamp, isRead } = x
						decryptSymmetric(msgs).then(resMsg => {
							const dbmsg: msgData = {
								id: id,
								message: resMsg,
								self: self,
								timeStamp: TimeStamp,
								user: userDetails?.name || '',
								url: userDetails?.url || '',
								isRead: isRead
							}
							decryptedMessages.push(dbmsg)
						})
					}
					setMessage((prevMessages) => [...decryptedMessages, ...prevMessages].sort((a, b) => {
						return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
					  }));
					setIsFetching(false)
					setIsLoading(false)
				})
		}
	}, [multi])

	socket.on('message', data => {
		if (chatId == data.chatId) {
			decryptSymmetric(data.msg).then(decMsg => {
				var newMsg: msgData = {
					id: data.chatId,
					message: decMsg,
					self: data.jwt == localStorage.getItem('jwt'),
					url: userDetails?.url || '',
					user: data.name,
					timeStamp: data.timeStamp,
					isRead: false
				}
				setMessage([...message, newMsg])
			})
		}
	})

	const handleScroll = () => {
		if(msgAreaRef.current!.scrollTop === 0){
			delay(1000).then(() => {
				setMulti(multi + 1)
			})
		}
	}

	useEffect(() => {
		messaChaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [message])

	if (isLoaading || userData == undefined) {
		return (
			<div className="flex flex-col w-full overflow-x-hidden overflow-y-scroll lg:h-[75vh] h-[65vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-center items-center">
				<LoadingSpinner size={400} />
			</div>
		)
	}
	return (
		<div className="flex flex-col w-full overflow-x-hidden overflow-y-scroll h-[100%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" ref={msgAreaRef} onScroll={handleScroll}>
			{isFetching && (<div className=' flex items-center justify-center'>
				<LoadingSpinner size={100} />
			</div>
			)}
			{message?.map((value, index) => (
				<div className="mb-5 mt-5" key={index}>
					<MessageElement messageInfo={value} />
					<div ref={messaChaRef} />
				</div>
			))}
		</div>
	)
}

export default Messages
