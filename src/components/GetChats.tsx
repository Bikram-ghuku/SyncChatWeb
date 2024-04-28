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
import { Input } from '@/components/ui/input'

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
						<DialogTitle>Enter the email address to message the person</DialogTitle>
						
						<DialogDescription>
							<br/>
							<Input />
							<br/>
							<Button variant={'default'}>Add User</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default GetChats
