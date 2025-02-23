import ChatView from '@/components/workspace/ChatView'
import CodeView from '@/components/workspace/CodeView'
import React from 'react'

export default function Workspage() {
  return (
    <div className="p-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <ChatView />
      <div className="col-span-2">
        <CodeView />
      </div>
    </div>
  </div>
  )
}
