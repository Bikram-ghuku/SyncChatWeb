'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Languages, Lock, Unlock } from 'lucide-react'
import AddOptions from '@/components/AddOptions'

function CallOptions() {
	return (
		<div className="flex gap-2">
			<AddOptions.TranslateDialog
				child={
					<Button variant="ghost" size="icon">
						<Languages size="1.25rem" />
					</Button>
				}
			/>
			<AddOptions.EncryptDialog
				child={
					<Button variant="ghost" size="icon">
						<Lock size="1.25rem" />
					</Button>
				}
			/>
			<AddOptions.DecryptDialog
				child={
					<Button variant="ghost" size="icon">
						<Unlock size="1.25rem" />
					</Button>
				}
			/>
		</div>
	)
}

export default CallOptions
