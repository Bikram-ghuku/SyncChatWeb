'use client'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

function page() {
	const router = useRouter()
	return (
		<div>
			<Header />
			<div className="relative isolate pt-14 ">
				<div className="absolute top-[7rem] flex h-[20rem] w-full items-center justify-center">
					<div className=" w-[16rem] h-[16rem] rounded-full bg-blue-500 blur-3xl bg-blend-overlay opacity-50"></div>
					<div className=" w-[15rem] h-[15rem] rounded-full bg-violet-600 blur-3xl bg-blend-overlay opacity-50"></div>
				</div>
				<div className="flex flex-col gap-10 w-full text-center items-center h-[20rem] justify-center z-10 text-black dark:text-white">
					<div className="text-5xl font-extrabold">Chat Sync</div>
					<div className=" text-xl">
						Encrypted, realtime, disposable one to one chat application
					</div>
					<div className=" flex items-center justify-center pt-5">
						<Button
							variant={'default'}
							className=" font-medium bg-indigo-600 text-white hover:bg-indigo-500 absolute"
							onClick={e => router.push('./register')}
						>
							Get started <ArrowRight />
						</Button>
					</div>
				</div>
				<div className=" w-full flex items-center justify-center">
					<Image src="/demo.png" alt="demoPicture" width={900} height={900} />
				</div>
			</div>
		</div>
	)
}

export default page
