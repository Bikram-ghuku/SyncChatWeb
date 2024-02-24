'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Smile, Mic, Paperclip, SendHorizonal } from 'lucide-react'
function InputArea() {
	return (
		<div className="flex h-full items-center md:pl-10 w-full">
			<Button variant="ghost" size="icon" className="mr-2">
				<Smile />
			</Button>
			<Input type="text" placeholder="Type Message..." className="" />
			<Button variant="ghost" size="icon" className="md:ml-5 md:mr-2 ml-1">
				<Mic />
			</Button>
			<Button variant="ghost" size="icon" className="md:mr-2 md:ml-2 mr-1">
				<Paperclip />
			</Button>
			<Button
				size="icon"
				className="mr-1 md:mr-5 ml-1 md:ml-5 md:w-[10%] bg-[#00a3ff] gap-2 p-5 w-[15%]"
			>
				Send <SendHorizonal size="1rem" />
			</Button>
		</div>
	)
}

export default InputArea
