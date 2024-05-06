'use client'
import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
export type user = {
	name: string
	url: string
	lastMsg?: string
	lastOnline?: string
	userId: string
	chanId: string
}
export const ChannelContext = createContext<
	| [
			user[] | undefined,
			React.Dispatch<React.SetStateAction<user[] | undefined>>,
	  ]
	| undefined
>(undefined)

const ChannelProvider = (props: any) => {
	const [userData, setUserData] = useState<user[] | undefined>(undefined)

	return (
		<ChannelContext.Provider value={[userData, setUserData]}>
			{props.children}
		</ChannelContext.Provider>
	)
}

export default ChannelProvider
