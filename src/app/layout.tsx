import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SocketProvider from '@/provider/socketProvider'
import ChannelProvider from '@/provider/channelProvider'
import { LocEncryptionProvider } from '@/provider/localEncryptionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Sync Chat',
	description: 'Chat Application',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ChannelProvider>
						<SocketProvider>
							<LocEncryptionProvider>
								<ThemeProvider
									attribute="class"
									defaultTheme="system"
									enableSystem
									disableTransitionOnChange
								>
									{children}
								</ThemeProvider>
							</LocEncryptionProvider>
						</SocketProvider>
				</ChannelProvider>
			</body>
		</html>
	)
}
