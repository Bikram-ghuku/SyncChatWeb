'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Smile, Mic, Paperclip, SendHorizonal } from 'lucide-react'
function InputArea() {
	return (
		<div className="flex h-full items-center pl-10 w-full">
            <Button variant="ghost" size="icon" className='mr-2'>
                <Smile />
            </Button>
			<Input type="text" placeholder='Type Message...' className='' />
            <Button variant="ghost" size="icon" className='ml-5 mr-2'>
                <Mic />
            </Button>
            <Button variant="ghost" size="icon" className='mr-2 ml-2'>
                <Paperclip />
            </Button>
            <Button size="icon" className='mr-5 ml-5 w-[10%] bg-[#00a3ff] gap-2 p-5'>
                Send <SendHorizonal size='1rem' />
            </Button>
		</div>
	)
}

export default InputArea
