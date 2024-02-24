'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

function SearchArea() {
	return (
		<div className="flex flex-row w-full max-w-sm items-center space-x-10 pr-10">
			<Input type="email" placeholder="Email" />
		</div>
	)
}

export default SearchArea
