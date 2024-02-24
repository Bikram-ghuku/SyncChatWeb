'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Video, MoreVertical } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
import { SelectGroup } from '@radix-ui/react-select'

function CallOptions() {
	return (
		<div className="flex gap-2">
			<Button variant="ghost" size="icon">
				<Phone size="1.25rem" />
			</Button>
			<Button variant="ghost" size="icon">
				<Video size="1.25rem" />
			</Button>
			<Dialog>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant="ghost" size="icon">
							<MoreVertical size="1.25rem" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Additional Settings</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DialogTrigger>
							<DropdownMenuItem>Translate</DropdownMenuItem>
						</DialogTrigger>
					</DropdownMenuContent>
				</DropdownMenu>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Translate text</DialogTitle>
					</DialogHeader>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select language to translate to"></SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="en">English</SelectItem>
								<SelectItem value="es">Spanish</SelectItem>
								<SelectItem value="hi">Hindi</SelectItem>
								<SelectItem value="fr">French</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default CallOptions
