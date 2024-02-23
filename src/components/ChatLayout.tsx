import React from 'react'

function ChatLayout() {
  return (
    <div className='flex flex-1'>
        <div className="flex flex-col w-1/4">
            <div className='flex h-1/6 w-full'>
                { /* Seatch and app name*/}
            </div>
            <div className='flex h-5/6 w-full'>
                { /* Contacts and names*/}
            </div>
        </div>
        <div className="flex w-3/4"></div>
    </div>
  )
}

export default ChatLayout