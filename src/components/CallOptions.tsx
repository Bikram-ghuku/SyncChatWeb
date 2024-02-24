'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Video, MoreVertical } from 'lucide-react'

function CallOptions() {
	return (
		<div className="flex gap-2">
			<Button variant="ghost" size="icon">
				<Phone size="1.25rem" />
			</Button>
			<Button variant="ghost" size="icon">
				<Video size="1.25rem" />
			</Button>
			<Button variant="ghost" size="icon">
				<MoreVertical size="1.25rem" />
			</Button>
		</div>
	)
}

export default CallOptions
