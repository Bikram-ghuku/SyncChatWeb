'use client'

import React, { useContext, useState } from 'react'
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
import {
	LocEncryptionContext,
	locEncryptionType,
} from '@/provider/localEncryptionProvider'

function TranslateDialog({ child }: { child: React.ReactNode }) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>{child}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Select Language to translate to</DialogTitle>
						<br />
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
							<br />
							<Button variant="default">Translate</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

function EncryptDialog({ child }: { child: React.ReactNode }) {
	const [locEncryptionData, setlocEncryptionData, actChannel] =
		useContext(LocEncryptionContext)!
	const [compKey, setCompKey] = useState<string>('')
	const [open, setIsOpen] = useState<boolean>(false)
	const storeData = () => {
		setlocEncryptionData(() => {
			const existing = locEncryptionData?.find(
				ele => ele.channelId === actChannel
			)
			const filtered: locEncryptionType[] =
				locEncryptionData?.filter(ele => ele.channelId !== actChannel) || []
			return [
				...filtered,
				{
					channelId: actChannel,
					encryptionKey: compKey,
					decryptionKey: existing?.decryptionKey || undefined,
				},
			]
		})
		setIsOpen(false)
	}
	const removeEncrypt = () => {
		setlocEncryptionData(() => {
			const existing = locEncryptionData?.find(
				ele => ele.channelId === actChannel
			)
			const filtered: locEncryptionType[] =
				locEncryptionData?.filter(ele => ele.channelId !== actChannel) || []
			return [
				...filtered,
				{
					channelId: actChannel,
					encryptionKey: undefined,
					decryptionKey: existing?.decryptionKey || undefined,
				},
			]
		})
		setIsOpen(false)
	}
	return (
		<div>
			<Dialog open={open} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>{child}</DialogTrigger>
				<DialogContent className="max-w-md rounded-2xl border  shadow-xl">
					<DialogHeader className="space-y-2">
						<DialogTitle className="text-xl font-semibold ">
							Decrypt Messages
						</DialogTitle>
						<DialogDescription className="text-sm ">
							Enter your private decryption key to unlock messages.
						</DialogDescription>
					</DialogHeader>

					<div className="mt-4 space-y-3">
						<Input
							type="text"
							placeholder="Enter your decryption key"
							onChange={e => setCompKey(e.target.value)}
						/>

						<div className="flex justify-end gap-2 pt-2">
							<Button variant="secondary" onClick={removeEncrypt}>
								Remove
							</Button>
							<Button variant="default" onClick={storeData}>
								Encrypt
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

function DecryptDialog({ child }: { child: React.ReactNode }) {
	const [locEncryptionData, setlocEncryptionData, actChannel] =
		useContext(LocEncryptionContext)!
	const [compKey, setCompKey] = useState<string>('')
	const [open, setIsOpen] = useState<boolean>(false)
	const storeData = () => {
		setlocEncryptionData(() => {
			const existing = locEncryptionData?.find(
				ele => ele.channelId === actChannel
			)
			const filtered: locEncryptionType[] =
				locEncryptionData?.filter(ele => ele.channelId !== actChannel) || []
			return [
				...filtered,
				{
					channelId: actChannel,
					encryptionKey: existing?.encryptionKey || undefined,
					decryptionKey: compKey,
				},
			]
		})
		setIsOpen(false)
	}
	const removeEncrypt = () => {
		setlocEncryptionData(() => {
			const existing = locEncryptionData?.find(
				ele => ele.channelId === actChannel
			)
			const filtered: locEncryptionType[] =
				locEncryptionData?.filter(ele => ele.channelId !== actChannel) || []
			return [
				...filtered,
				{
					channelId: actChannel,
					encryptionKey: existing?.encryptionKey || undefined,
					decryptionKey: undefined,
				},
			]
		})
		setIsOpen(false)
	}
	return (
		<div>
			<Dialog open={open} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>{child}</DialogTrigger>
				<DialogContent className="max-w-md rounded-2xl border  shadow-xl">
					<DialogHeader className="space-y-2">
						<DialogTitle className="text-xl font-semibold ">
							Decrypt Messages
						</DialogTitle>
						<DialogDescription className="text-sm ">
							Enter your private decryption key to unlock messages.
						</DialogDescription>
					</DialogHeader>

					<div className="mt-4 space-y-3">
						<Input
							type="text"
							placeholder="Enter your decryption key"
							onChange={e => setCompKey(e.target.value)}
						/>

						<div className="flex justify-end gap-2 pt-2">
							<Button variant="secondary" onClick={removeEncrypt}>
								Remove
							</Button>
							<Button variant="default" onClick={storeData}>
								Decrypt
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

const AddOptions = { TranslateDialog, EncryptDialog, DecryptDialog }

export default AddOptions
