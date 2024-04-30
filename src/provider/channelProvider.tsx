'use client'
import { createContext, useState, useEffect } from 'react'
export type user = {
	name: string
	url: string
	lastMsg?: string
	lastTime?: string
	userId: string
	chanId: string
}

export const ChannelContext = createContext<user[]>([])

const ChannelProvider = (props: any) => {
	const [userData, setUserData] = useState<user[]>([])

	useEffect(() => {
		if (localStorage.getItem('jwt')) {
			fetch(process.env.NEXT_PUBLIC_API_URL + '/channels/channels', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
				.then(data => data.json())
				.then(data => {
					if (data.length !== 0) setUserData(data)
					console.log(data)
				})
		}
	}, [])
	return (
		<ChannelContext.Provider value={userData}>
			{props.children}
		</ChannelContext.Provider>
	)
}

export default ChannelProvider
