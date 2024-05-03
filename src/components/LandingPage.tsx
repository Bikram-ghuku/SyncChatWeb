'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function LandingPage() {
    const router = useRouter()
  return (
    <div>
        <div className="h-screen w-full">
				<div className="relative isolate pt-14 ">
					<div className="absolute top-[8rem] flex h-[20rem] w-full items-center justify-center">
						<div className=" w-[16rem] h-[16rem] rounded-full bg-blue-500 blur-3xl bg-blend-overlay opacity-50"></div>
						<div className=" w-[15rem] h-[15rem] rounded-full bg-violet-600 blur-3xl bg-blend-overlay opacity-50"></div>
					</div>
					<div className="flex flex-col gap-10 w-full text-center items-center h-[20rem] justify-center z-10 text-black dark:text-white absolute">
						<div className="text-5xl font-extrabold">Sync Chat</div>
						<div className=" text-xl">
							Open-Source, Encrypted, realtime, disposable one to one chat
							application
						</div>
						<div className=" flex items-center justify-center pt-5">
							<Button
								variant={'default'}
								className=" font-medium bg-indigo-600 text-white hover:bg-indigo-500 absolute flex-1 mr-[10rem]"
								onClick={e => router.push('./register')}
							>
								Get started <ArrowRight />
							</Button>
							<Link
								href={'https://github.com/Bikram-ghuku/chatSyncWeb'}
								className="absolute flex-1 ml-[10rem] underline"
							>
								View on Github
							</Link>
						</div>
					</div>
					<div className=" w-full flex items-center justify-center">
						<Image
							src="/demo.png"
							alt="demoPicture"
							width={900}
							height={900}
							className="absolute top-[24rem]"
						/>
					</div>
				</div>
			</div>
			<div className="h-screen w-full">
				<div className="relative ml-[4rem]">
					<div className="absolute top-[20rem] flex h-[20rem] w-full items-center justify-start">
						<div className=" w-[20rem] h-[20rem] rounded-full bg-blue-500 blur-3xl bg-blend-overlay opacity-50"></div>
						<div className=" w-[20rem] h-[20rem] rounded-full bg-violet-600 blur-3xl bg-blend-overlay opacity-50"></div>
					</div>
				</div>
				<div className="flex flex-row pt-[10rem] absolute">
					<div className="flex-1">
						<Image
							src="/demo_mob.png"
							alt="mobileDemo"
							width={375}
							height={666}
							className="absolute left-[10rem]"
						/>
					</div>
					<div className="lg:flex flex-1 flex-col mb-20 mr-20 mt-20 hidden">
						<div>
							<div className=" text-7xl font-extrabold mb-20 mr-20 mt-20">
								You focus on chatting, let us handle the rest
							</div>
							<div className="text-lg mr-20">
								With the implementation of Advanced Encryption Standards (AES)
								and the availability of open-source code for the chat
								application, bugs are detected, reported, and promptly addressed
								by a diverse community of users and developers.
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
  )
}

export default LandingPage