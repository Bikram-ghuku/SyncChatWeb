'use client'
import React from 'react'
import { MessageSquarePlus } from 'lucide-react'
import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

function GetChats() {
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<Button variant={'ghost'}>
						<MessageSquarePlus />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Enter the chatId</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default GetChats
