'use client'

import React from 'react'
import { Input } from '@/components/ui/input'

function SearchArea() {
	return (
		<div className="flex flex-row w-full max-w-sm items-center space-x-10 pr-5">
			<Input type="email" placeholder="Search for contact" />
		</div>
	)
}

export default SearchArea
