'use client';
import AppSideBar from '@/components/layouts/AppSideBar';
import Header from '@/components/layouts/Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ChatView from '@/components/workspace/ChatView';
import { ActionContext } from '@/context/ActionContext';
import { MessageProvider } from '@/context/MessageContext';
import { useState } from 'react';

export default function HomeLayout({ children }) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSideBar />
        <div className="flex flex-col w-full">
          <Header />
          {children}
        </div>
        <MessageProvider></MessageProvider>
      </SidebarProvider>
    </>
  );
}
