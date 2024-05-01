'use client'
import { createContext, useState, useEffect } from 'react'
export type user = {
	name: string
	url: string
	lastMsg?: string
	lastOnline?: string
	userId: string
	chanId: string
}

export const ChannelContext = createContext<{ isLoad: boolean; userDet: user[]; }>({
	isLoad: true,
	userDet: []
})

const ChannelProvider = (props: any) => {
	const [userData, setUserData] = useState<user[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
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
					if (data.length !== 0){
						setUserData(data)
						setIsLoading(false)
					}
					console.log(data)
				})
		}
	}, [])
	
	return (
		<ChannelContext.Provider value={{isLoad: isLoading, userDet: userData}}>
			{props.children}
		</ChannelContext.Provider>
	)
}

export default ChannelProvider
