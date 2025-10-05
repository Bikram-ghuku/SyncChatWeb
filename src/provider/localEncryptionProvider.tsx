'use client'
import React, { createContext, useState, useEffect } from 'react'

export type locEncryptionType = {
	channelId: string
	encryptionKey: string | undefined
	decryptionKey: string | undefined
}

export const LocEncryptionContext = createContext<
	| [
			locEncryptionType[],
			React.Dispatch<React.SetStateAction<locEncryptionType[]>>,
            string,
            React.Dispatch<React.SetStateAction<string>>
	  ]
	| undefined
>(undefined)

export const LocEncryptionProvider = (props: any) => {
	const [locEncryptionData, setlocEncryptionData] = useState<locEncryptionType[]>(
		() => {
			if (typeof window !== 'undefined') {
				const stored = localStorage.getItem('locEncryptionData')
				return stored ? JSON.parse(stored) : []
			}
			return []
		}
	)
    const [actChannel, setActChannel] = useState<string>('');

	useEffect(() => {
		if (locEncryptionData) {
			localStorage.setItem('locEncryptionData', JSON.stringify(locEncryptionData))
		} else {
			localStorage.removeItem('locEncryptionData')
		}
	}, [locEncryptionData])

	return (
		<LocEncryptionContext.Provider value={[locEncryptionData, setlocEncryptionData, actChannel, setActChannel]}>
			{props.children}
		</LocEncryptionContext.Provider>
	)
}
