'use client'

import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'


import { Input } from '@/components/ui/input'
import { Button } from './ui/button'

function TranslateDialog({ child }: { child: React.ReactNode }) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>{child}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Select Language to translate to</DialogTitle>
						<DialogDescription>
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select Your language" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="en">English</SelectItem>
									<SelectItem value="gb">German</SelectItem>
									<SelectItem value="fr">French</SelectItem>
									<SelectItem value="hi">Hindi</SelectItem>
								</SelectContent>
							</Select>
							<Button variant='default'>Translate</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

function EncryptDialog({ child }: { child: React.ReactNode }) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>{child}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Enter the encryption key to encrypt your message
						</DialogTitle>
						<DialogDescription>
							<Input type="text" placeholder="Enter your encryption Key" />
							<Button variant='default'>Encrypt</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

function DecryptDialog({ child }: { child: React.ReactNode }) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>{child}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Enter the decryption key to decrypt the messages
						</DialogTitle>
						<DialogDescription>
							<Input type="text" placeholder="Enter your Decryption Key" />
							<Button variant='default'>Decrypt</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

const AddOptions = { TranslateDialog, EncryptDialog, DecryptDialog }

export default AddOptions
