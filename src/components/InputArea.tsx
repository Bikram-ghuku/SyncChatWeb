'use client'
import React, { useContext, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Smile, Mic, Paperclip, SendHorizonal } from 'lucide-react'
import { socketContext } from '@/provider/socketProvider'
import { encryptSymmetric } from '@/encryption/Controller'
import { useRouter } from 'next/navigation'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import { Textarea } from '@/components/ui/textarea'

function InputArea({ chatId }: { chatId: string }) {
	const [text, setText] = useState<string>('')
	const [openEmoji, setOpenEmoji] = useState<boolean>(true)
	const socket = useContext(socketContext)
	const textAreaRef = useRef<null | HTMLTextAreaElement>(null)
	const submitRef = useRef<null | HTMLButtonElement>(null)
	const router = useRouter()

	const sendMsg = async () => {
		if (text == '') return
		console.log('Sending data...')
		const currTime = new Date().toLocaleString()
		const data = {
			jwt: localStorage.getItem('jwt'),
			msg: await encryptSymmetric(text),
			chatId: chatId,
			timeStamp: currTime,
		}
		setText('')
		socket.emit('message', data)
		textAreaRef.current ? (textAreaRef.current.value = '') : null
	}

	const emojiPicked = (e: any) => {
		if (textAreaRef.current) {
			setText(textAreaRef.current!.value + e.emoji)
		}
	}

	const checkEnter = (e: any) => {
		if (e.keyCode === 13 && !e.shiftKey) {
				e.preventDefault()
				submitRef.current?.click()
		}
		if (e.keyCode === 27) {
			setText('')
			setOpenEmoji(true)
			router.push('../chat')
		}
	}
	return (
		<div className="flex h-full items-center md:pl-10 w-full">
			<Button
				variant="ghost"
				size="icon"
				className="mr-2"
				onClick={() => setOpenEmoji(!openEmoji)}
			>
				<Smile />
			</Button>
			<div className=" absolute bottom-16">
				<EmojiPicker
					theme={Theme.AUTO}
					open={!openEmoji}
					lazyLoadEmojis={true}
					onEmojiClick={emojiPicked}
					className="sm:w-[100%] sm:h-[10%]  lg:w-[20vw] lg:h-[40vh]"
				/>
			</div>
			<Textarea 
				placeholder="Type Message..."
				className=' whitespace-nowrap overflow-hidden resize-none min-h-0'
				onChange={e => setText(e.target.value)}
				ref={textAreaRef}
				onKeyDown={e => checkEnter(e)}
				value={text!}
				rows={1}
				cols={50}
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
