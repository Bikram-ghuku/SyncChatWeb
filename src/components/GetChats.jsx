'use client'
import React from 'react'
import { MessageSquarePlus } from 'lucide-react'
import { Button } from './ui/button'

function GetChats() {
	return (
		<div>
			<Button variant={'ghost'}>
				<MessageSquarePlus />
			</Button>
		</div>
	)
}

export default GetChats
