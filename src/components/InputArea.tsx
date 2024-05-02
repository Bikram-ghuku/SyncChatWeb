'use client'
import React, { useContext, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Smile, Mic, Paperclip, SendHorizonal } from 'lucide-react'
import { socketContext } from '@/provider/socketProvider'
import { encryptSymmetric } from '@/encryption/Controller'
import { useRouter } from 'next/navigation'
import EmojiPicker from 'emoji-picker-react'

function InputArea({ chatId }: { chatId: string }) {
	const [text, setText] = useState<null | string>(null)
	const [openEmoji, setOpenEmoji] = useState<boolean>(true);
	const socket = useContext(socketContext)
	const textAreaRef = useRef<null | HTMLInputElement>(null)
	const submitRef = useRef<null | HTMLButtonElement>(null)
	const router = useRouter()

	const sendMsg = async () => {
		if (!text) return
		console.log('Sending data...')
		const currTime = new Date().toLocaleString()
		const data = {
			jwt: localStorage.getItem('jwt'),
			msg: await encryptSymmetric(text),
			chatId: chatId,
			timeStamp: currTime,
		}
		socket.emit('message', data)
		textAreaRef.current ? (textAreaRef.current.value = '') : null
		setText('')
	}

	const checkEnter = (e: any) => {
		if (e.keyCode === 13) {
			submitRef.current?.click()
		}
		if (e.keyCode === 27) {
			router.push('../chat')
		}
	}
	return (
		<div className="flex h-full items-center md:pl-10 w-full">
			<Button variant="ghost" size="icon" className="mr-2" onClick={() => setOpenEmoji(!openEmoji)}>
				<Smile />
			</Button>
			<div className=' absolute bottom-16'>
				<EmojiPicker open={!openEmoji} lazyLoadEmojis={true} width='20vw' height='40vh'/>
			</div>
			<Input
				type="text"
				placeholder="Type Message..."
				className=""
				onChange={e => setText(e.target.value)}
				ref={textAreaRef}
				onKeyDown={e => checkEnter(e)}
			/>
			<Button variant="ghost" size="icon" className="md:ml-5 md:mr-2 ml-1">
				<Mic />
			</Button>
			<Button variant="ghost" size="icon" className="md:mr-2 md:ml-2 mr-1">
				<Paperclip />
			</Button>
			<Button
				size="icon"
				className="mr-1 md:mr-5 ml-1 md:ml-5 md:w-[10%] bg-[#00a3ff] gap-2 p-5 w-[15%]"
				onClick={() => sendMsg()}
				ref={submitRef}
			>
				Send <SendHorizonal size="1rem" />
			</Button>
		</div>
	)
}

export default InputArea
