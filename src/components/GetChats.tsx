'use client'
import React, { useState } from 'react'
import { Loader2, MessageSquarePlus } from 'lucide-react'
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
import axios from 'axios'

function GetChats() {
	const [email, setEmail] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const handleCreateChat = () => {
		axios.post(
			process.env.NEXT_PUBLIC_API_URL + '/channels/addChannels',
			{ email },
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			}
		)
	}
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
						<DialogTitle>
							Enter the email address to message the person
						</DialogTitle>

						<DialogDescription>
							<br />
							<Input
								onChange={e => setEmail(e.target.value)}
								type="email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
							/>
							<br />
							<Button
								disabled={isLoading}
								variant={'default'}
								onClick={() => handleCreateChat()}
							>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								Add User
							</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default GetChats
