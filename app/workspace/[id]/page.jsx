'use client';
import AppSideBar from '@/components/layouts/AppSideBar';
import Header from '@/components/layouts/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import ChatView from '@/components/workspace/ChatView'
import CodeView from '@/components/workspace/CodeView'
import React from 'react'

export default function Workspage({ }) {
  return (
    <div className="p-3 pr-5 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <SidebarProvider defaultOpen={false} > 
          <AppSideBar />
          <SidebarTrigger/>
          <ChatView />
        </SidebarProvider>
        <div className="col-span-2">
          <CodeView />
        </div>

      </div>
    </div >

  )
}
