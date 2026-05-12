import { Suspense } from 'react'
import ChatPageClient from '@/components/ChatPageClient'

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ChatPageClient />
		</Suspense>
	)
}
