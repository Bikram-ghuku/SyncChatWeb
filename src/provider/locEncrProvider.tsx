'use client'
import React, { createContext, useState} from 'react'


export const locEncrContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>, string, React.Dispatch<React.SetStateAction<string>>] | undefined>(undefined)

const LocalKeyProvider = (props: any) => {
	const [keyEnc, setKeyEnc] = useState<string>("")
	const [keyDeEnc, setKeyDeEnc] = useState<string>("")
	return (
		<locEncrContext.Provider value={[keyEnc, setKeyEnc, keyDeEnc, setKeyDeEnc]}>
			{props.children}
		</locEncrContext.Provider>
	)
}

export default LocalKeyProvider
