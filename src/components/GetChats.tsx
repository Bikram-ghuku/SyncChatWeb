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
import { Toaster } from './ui/toaster'
import { useToast } from './ui/use-toast'

function GetChats() {
	const [email, setEmail] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()
	const [open, setIsOpen] = useState<boolean>(false)
	const handleCreateChat = () => {
		setIsLoading(true)
		axios
			.post(
				process.env.NEXT_PUBLIC_API_URL + '/channels/addChannels',
				{ email },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					},
				}
			)
			.then(data => {
				if (data.status == 200) {
					setIsLoading(false)
					setIsOpen(false)
					toast({
						title: 'Successfully created channel',
						description: 'A new channel between the two people has been made',
					})
				}
			})
			.catch(error => {
				setIsLoading(false)
				setIsOpen(false)
				if (error.response.status == 409) {
					toast({
						title: 'Error creating channel',
						description: 'A channel bewteen the users exists',
					})
				}
				if (error.response.status == 404) {
					toast({
						title: 'Error creating channel',
						description: 'User with the given email is not found',
					})
				}
				if (error.response.status == 500) {
					toast({
						title: 'Server',
						description: 'Server error',
					})
				}
			})
	}
	return (
		<div>
			<Dialog open={open} onOpenChange={setIsOpen}>
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
								placeholder="name@example.com"
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
			<Toaster />
		</div>
	)
}

export default GetChats
