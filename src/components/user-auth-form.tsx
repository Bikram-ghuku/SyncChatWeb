'use client'
import { Toaster } from '@/components/ui/toaster'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	variant: string
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [pswd, setPswd] = useState<string>('')
	const [name, setName] = useState<string>('')
	const { toast } = useToast()
	const router = useRouter()

	const Handle = () => {
		axios
			.post(process.env.NEXT_PUBLIC_API_URL + '/users/' + props.variant, {
				email: email,
				pswd: pswd,
				name: name,
			})
			.then(data => {
				console.log(data)
				if (data.status == 200 || data.status == 201) {
					router.push(props.variant === 'register' ? '/login' : '/chat')
					if (props.variant === 'login') {
						localStorage.setItem('jwt', data.data.token)
						localStorage.setItem('name', JSON.stringify(data.data))
					}
				}
				
			})
			.catch(error => {
				if (error.response) {
					setIsLoading(false)
					console.log(error.response.data)
					console.log(error.response.status)
					console.log(error.response.headers)
					if (error.response.status == 401) {
						toast({
							title: 'Invalid username or password',
							description:
								'Username or password is incorrect please use correct email and password',
						})
					}

					if (error.response.status == 409) {
						toast({
							title: 'Email already exsists',
							description:
								'A user with the given email already exsists. Please proceed to login or use a different email',
						})
					}
				}
			})
	}

	const handleSubmit = async () => {
		setIsLoading(true)
		Handle()
	}
	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-5">
						<Label className="sr-only pb-10" htmlFor="email">
							Email
						</Label>
						{props.variant == 'register' && (
							<Input
								id="name"
								placeholder="Enter your name"
								type="text"
								autoComplete="text"
								autoCorrect="none"
								onChange={e => setName(e.target.value)}
							/>
						)}
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							onChange={e => setEmail(e.target.value)}
						/>
						<Input
							id="pswd"
							placeholder="Enter your password"
							type="password"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							onChange={e => setPswd(e.target.value)}
						/>
						{}
					</div>
					<button
						disabled={isLoading}
						onClick={() => handleSubmit()}
						className={cn(buttonVariants())}
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{props.variant == 'register'
							? 'Register with Email'
							: 'Login with email'}
					</button>
					<Toaster />
				</div>
			</form>
		</div>
	)
}
