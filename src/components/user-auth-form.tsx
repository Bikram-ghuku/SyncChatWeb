'use client'
import { Toaster } from "@/components/ui/toaster"
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

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
	const handleSubmit = async () => {
		setIsLoading(true)

		fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + props.variant, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email, pswd: pswd, name: name }),
		}).then(data => data.json()
		).then(data => {
			if(data.ok){
				setIsLoading(false)
				localStorage.setItem('jwt', data.token)
				localStorage.setItem('userdata', JSON.stringify(data))
				router.push(props.variant == 'login' ? '/chat' : '/login')
			}else{
				setIsLoading(false)
				if(props.variant === "register"){
					toast({
						title: "Registration error",
						description: "A user with the username and password already exsists"
					})
				}else{
					toast({
						title: "Login error",
						description: "Account may not be present or usename and password invalid"
					})
				}
				
			}
		}).catch((err) => {
			console.log(err)
		})
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
						{props.variant == 'register' ? "Register with Email" : "Login with email"}
					</button>
				<Toaster/>
				</div>
			</form>
		</div>
	)
}
