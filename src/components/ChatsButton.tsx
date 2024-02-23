'use client'
import React from 'react'
import { Button } from './ui/button'
import { MessagesSquare } from 'lucide-react'

function ChatsButton() {
	return (
		<div>
			<Button variant={'ghost'}>
				<MessagesSquare />
			</Button>
		</div>
	)
}

export default ChatsButton
