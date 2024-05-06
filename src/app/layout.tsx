import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SocketProvider from '@/provider/socketProvider'
import ChannelProvider from '@/provider/channelProvider'
import LocalKeyProvider from '@/provider/locEncrProvider'

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
					<LocalKeyProvider>
						<SocketProvider>
							<ThemeProvider
								attribute="class"
								defaultTheme="system"
								enableSystem
								disableTransitionOnChange
							>
								{children}
							</ThemeProvider>
						</SocketProvider>
					</LocalKeyProvider>
				</ChannelProvider>
			</body>
		</html>
	)
}
