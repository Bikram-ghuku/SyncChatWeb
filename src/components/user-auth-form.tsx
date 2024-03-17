'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("");
    const [pswd, setPswd] = useState<string>("");
	const searchParams = useSearchParams()
    const router = useRouter();
	const handleSubmit = () => {
        setIsLoading(true);
        fetch(process.env.NEXT_PUBLIC_API_URL+"/users/login", {
            method:'POST',
            headers:{
                'Content-Type':'application/json' 
            },
            body: JSON.stringify({email: email, pswd: pswd})
        }).then(data => {
            if(data.ok){
                data.json().then(data => {
                    setIsLoading(false)
                    localStorage.setItem('jwt', data.token)
                    localStorage.setItem('userdata', JSON.stringify(data))
                    router.push('/chat')
                })
            }else{
                setIsLoading(false)
                toast({
                     title: "Incorrect email or password",
                     description: "Try entering email and password correctly"
                })
            }
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
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
                            onChange={(e) => setEmail(e.target.value)}
						/>
                        <Input
							id="pswd"
							placeholder="Enter your password"
							type="password"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
                            onChange={(e) => setPswd(e.target.value)}
						/>
					</div>
					<button disabled={isLoading} onClick={() => handleSubmit()} className={cn(buttonVariants())}>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Sign In with Email
					</button>
				</div>
			</form>
		</div>
	)
}
