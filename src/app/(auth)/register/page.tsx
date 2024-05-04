import { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Command, ChevronLeft } from 'lucide-react'
import { UserAuthForm } from '@/components/user-auth-form'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Register',
	description: 'Register your account',
}

export default function RegisterPage() {
	return (
		<Suspense>
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'absolute left-4 top-4 md:left-8 md:top-8'
				)}
			>
				<>
					<ChevronLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<Command className="mx-auto h-6 w-6" />
					<h1 className="text-2xl font-semibold tracking-tight">
						Create account
					</h1>
					<p className="text-sm text-muted-foreground">
						Enter your email to create your account
					</p>
				</div>
				<UserAuthForm className="h-[27vh]" variant="register" />
				<p className="px-8 text-center text-sm text-muted-foreground">
					<Link
						href="/login"
						className="hover:text-brand underline underline-offset-4"
					>
						Already have an account? Sign In
					</Link>
				</p>
			</div>
		</div>
		</Suspense>
	)
}
