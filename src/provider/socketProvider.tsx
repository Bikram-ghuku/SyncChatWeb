'use client'
import { createContext, useEffect, useMemo, useRef, useState } from 'react'

type SocketHandler = (data: any) => void
type SocketClient = {
	on: (event: string, handler: SocketHandler) => void
	off: (event: string, handler: SocketHandler) => void
	send: (event: string, data: any) => void
	isConnected: boolean
}

const createSocketClient = (
	wsRef: React.MutableRefObject<WebSocket | null>,
	listenersRef: React.MutableRefObject<Map<string, Set<SocketHandler>>>,
	isConnected: boolean
): SocketClient => {
	const on = (event: string, handler: SocketHandler) => {
		const existing = listenersRef.current.get(event) || new Set<SocketHandler>()
		existing.add(handler)
		listenersRef.current.set(event, existing)
	}

	const off = (event: string, handler: SocketHandler) => {
		const existing = listenersRef.current.get(event)
		if (!existing) return
		existing.delete(handler)
		if (existing.size === 0) listenersRef.current.delete(event)
	}

	const send = (event: string, data: any) => {
		const socket = wsRef.current
		if (!socket || socket.readyState !== WebSocket.OPEN) return
		socket.send(JSON.stringify({ type: event, data }))
	}

	return { on, off, send, isConnected }
}

export const socketContext = createContext<SocketClient>({
	on: () => undefined,
	off: () => undefined,
	send: () => undefined,
	isConnected: false,
})

const SocketProvider = (props: { children: React.ReactNode }) => {
	const wsRef = useRef<WebSocket | null>(null)
	const listenersRef = useRef<Map<string, Set<SocketHandler>>>(new Map())
	const [isConnected, setIsConnected] = useState(false)
	const reconnectTimerRef = useRef<number | null>(null)

	useEffect(() => {
		const url = process.env.NEXT_PUBLIC_SOCKET_URL
		if (!url) return

		const connect = () => {
			if (wsRef.current) wsRef.current.close()
			const socket = new WebSocket(url)
			wsRef.current = socket

			socket.addEventListener('open', () => {
				setIsConnected(true)
			})

			socket.addEventListener('close', () => {
				setIsConnected(false)
				if (reconnectTimerRef.current) return
				reconnectTimerRef.current = window.setTimeout(() => {
					reconnectTimerRef.current = null
					connect()
				}, 1000)
			})

			socket.addEventListener('message', event => {
				let payload: any
				try {
					payload = JSON.parse(event.data)
				} catch {
					return
				}

				const type = payload?.type || 'message'
				const data = payload?.data ?? payload
				const listeners = listenersRef.current.get(type)
				if (!listeners) return
				listeners.forEach(handler => handler(data))
			})
		}

		connect()
		return () => {
			if (reconnectTimerRef.current) {
				window.clearTimeout(reconnectTimerRef.current)
				reconnectTimerRef.current = null
			}
			wsRef.current?.close()
			wsRef.current = null
		}
	}, [])

	const client = useMemo(
		() => createSocketClient(wsRef, listenersRef, isConnected),
		[isConnected]
	)

	return (
		<socketContext.Provider value={client}>
			{props.children}
		</socketContext.Provider>
	)
}

export default SocketProvider
