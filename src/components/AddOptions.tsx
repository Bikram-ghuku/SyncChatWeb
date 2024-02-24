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

function TranslateDialog({ child }: { child: React.ReactNode }) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>{child}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Select Language to translate to</DialogTitle>
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
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
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
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

const AddOptions = { TranslateDialog, EncryptDialog, DecryptDialog }

export default AddOptions
