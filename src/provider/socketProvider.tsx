'use client'
import { createContext } from "react"
import {io} from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!)
export const socketContext = createContext(socket)

const SocketProvider = (props:any) => {
    return(
        <socketContext.Provider value={socket}>
            {props.children}
        </socketContext.Provider>
    )
}

export default SocketProvider