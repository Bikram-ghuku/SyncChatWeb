'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MessageElement, { type message } from '@/components/MessageElement'
import { socketContext } from '@/provider/socketProvider'
import { decryptSymmetric, decryptSymmetricKey } from '@/encryption/Controller'
import axios from 'axios'
import { LoadingSpinner } from './Spinner'
import { ChannelContext, user } from '@/provider/channelProvider'
import { LocEncryptionContext } from '@/provider/localEncryptionProvider'

export type socketMsg = {
	jwt: string
	chatId: string
	msg: string
	timeStamp: string
	name: string
}
function Messages({
	chatId,
	userDetail,
}: {
	chatId: string
	userDetail?: user
}) {
	const socket = useContext(socketContext)
	const messaChaRef = useRef<null | HTMLDivElement>(null)
	const shouldAutoScrollRef = useRef<boolean>(true)
	const seenMessageKeysRef = useRef<Set<string>>(new Set())
	const [message, setMessage] = useState<message[]>([])
	const [userData] = useContext(ChannelContext)!
	const [isLoaading, setIsLoading] = useState<boolean>(true)
	const [multi, setMulti] = useState<number>(0)
	const msgAreaRef = useRef<HTMLDivElement>(null)
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const [userDetails, setUserDetails] = useState<user | undefined>(userDetail)
	const userDetailsRef = useRef<user | undefined>(userDetail)
	const [locEncryptionData, setlocEncryptionData, actChannel, setActChannel] =
		useContext(LocEncryptionContext)!
	const currData = locEncryptionData.find(data => data.channelId == actChannel)
	const normalizeTimestamp = (timeStamp?: string) => {
		if (!timeStamp) return ''
		const parsed = Date.parse(timeStamp)
		return Number.isNaN(parsed) ? timeStamp : String(parsed)
	}
	const buildMessageKey = (data: {
		chatId?: string
		timeStamp?: string
		message?: string
		sender?: string
	}) => {
		return [
			data.chatId || '',
			normalizeTimestamp(data.timeStamp),
			data.message || '',
			data.sender || '',
		].join('|')
	}
	useEffect(() => {
		setUserDetails(userDetail)
		userDetailsRef.current = userDetail
	}, [userDetail])

	useEffect(() => {
		if (!userDetail) return
		setMessage(prev =>
			prev.map(item => {
				if (item.self) return item
				return {
					...item,
					user: item.user || userDetail.name,
					url: item.url || userDetail.url,
				}
			})
		)
	}, [userDetail])

	useEffect(() => {
		let isActive = true
		const jwt = localStorage.getItem('jwt')
		if (!jwt || !chatId) {
			setIsFetching(false)
			setIsLoading(false)
			return () => {
				isActive = false
			}
		}
		if (jwt && chatId) {
			setIsFetching(true)
			axios
				.post(
					process.env.NEXT_PUBLIC_API_URL + '/message/getMsgs',
					{
						chatId: chatId,
						multi: multi,
					},
					{
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
					}
				)
				.then(async data => {
					if (!isActive) return
					const resData = data.data || []
					if (resData.length === 0) {
						setIsFetching(false)
						setIsLoading(false)
						return
					}
					const decryptedMessages: message[] = []
					for (const x of resData) {
						const { id, msgs, self, TimeStamp, isRead, name, url } = x
						const resMsg = await decryptSymmetric(msgs)
						const key = buildMessageKey({
							chatId: chatId,
							timeStamp: TimeStamp,
							message: resMsg,
							sender: name || (self ? 'self' : ''),
						})
						if (seenMessageKeysRef.current.has(key)) continue
						seenMessageKeysRef.current.add(key)
						const fallbackUser = userDetailsRef.current
						decryptedMessages.push({
							id: id,
							message: resMsg,
							self: self,
							timeStamp: TimeStamp,
							user: name || fallbackUser?.name || '',
							url: url || fallbackUser?.url || '',
							isRead: isRead,
						})
					}
					setMessage(prevMessages =>
						[...decryptedMessages, ...prevMessages].sort((a, b) => {
							return (
								new Date(a.timeStamp).getTime() -
								new Date(b.timeStamp).getTime()
							)
						})
					)
					setIsFetching(false)
					setIsLoading(false)
				})
				.catch(err => {
					if (!isActive) return
					console.log(err)
					setIsLoading(false)
				})
		}

		return () => {
			isActive = false
		}
	}, [chatId, multi])

	useEffect(() => {
		setMessage([])
		setMulti(0)
		setIsLoading(true)
		seenMessageKeysRef.current.clear()
		shouldAutoScrollRef.current = true
	}, [chatId])

	useEffect(() => {
		const handleMessage = (rawData: socketMsg | Record<string, socketMsg>) => {
			const payload = (rawData as socketMsg).jwt
				? (rawData as socketMsg)
				: (Object.values(rawData)[0] as socketMsg | undefined)
			if (!payload || chatId != payload.chatId) return
			decryptSymmetric(payload.msg)
				.then(decMsg => {
					let eleFinal = decMsg
					if (currData) {
						if (
							payload.jwt == localStorage.getItem('jwt') &&
							currData.encryptionKey
						) {
							return decryptSymmetricKey(decMsg, currData.encryptionKey)
						} else if (
							payload.jwt != localStorage.getItem('jwt') &&
							currData.decryptionKey
						) {
							return decryptSymmetricKey(decMsg, currData.decryptionKey)
						}
					}
					return eleFinal
				})
				.then(eleFinal => {
					const key = buildMessageKey({
						chatId: payload.chatId,
						timeStamp: payload.timeStamp,
						message: eleFinal,
						sender: payload.name || payload.jwt,
					})
					if (seenMessageKeysRef.current.has(key)) return
					seenMessageKeysRef.current.add(key)
					shouldAutoScrollRef.current = true
					const fallbackUser = userDetailsRef.current
					const newMsg: message = {
						id: payload.chatId,
						message: eleFinal,
						self: payload.jwt == localStorage.getItem('jwt'),
						url: fallbackUser?.url || '',
						user: payload.name || fallbackUser?.name || '',
						timeStamp: payload.timeStamp,
						isRead: false,
					}
					setMessage(prev => [...prev, newMsg])
				})
		}

		socket.on('message', handleMessage)

		return () => {
			socket.off('message', handleMessage)
		}
	}, [socket, chatId, currData, userDetails])

	const handleScroll = () => {
		const container = msgAreaRef.current
		if (!container || isFetching) return
		const distanceFromBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight
		shouldAutoScrollRef.current = distanceFromBottom < 40
		if (container.scrollTop === 0) {
			shouldAutoScrollRef.current = false
			setMulti(prev => prev + 1)
		}
	}

	useEffect(() => {
		const container = msgAreaRef.current
		if (shouldAutoScrollRef.current && container) {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: 'smooth',
			})
		}
		shouldAutoScrollRef.current = true
	}, [message])

	if (isLoaading) {
		return (
			<div className="flex flex-col w-full overflow-x-hidden overflow-y-scroll lg:h-[75vh] h-[65vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-center items-center">
				<LoadingSpinner size={400} />
			</div>
		)
	}
	return (
		<div
			className="flex flex-col w-full overflow-x-hidden overflow-y-scroll h-[100%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
			ref={msgAreaRef}
			onScroll={handleScroll}
		>
			{isFetching && (
				<div className=" flex items-center justify-center">
					<LoadingSpinner size={100} />
				</div>
			)}
			{message?.map(value => (
				<div className="mb-5 mt-5" key={`${value.id}-${value.timeStamp}`}>
					<MessageElement messageInfo={value} />
				</div>
			))}
			<div ref={messaChaRef} />
		</div>
	)
}

export default Messages
