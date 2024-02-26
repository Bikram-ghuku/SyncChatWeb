'use client'
import React from 'react'
import { Button } from './ui/button'
import { MessagesSquare } from 'lucide-react'
import Link from 'next/link'

function ChatsButton() {
	return (
		<div>
			<Button variant={'ghost'}>
				<Link href="../chat">
					<MessagesSquare />
				</Link>
			</Button>
		</div>
	)
}

export default ChatsButton
