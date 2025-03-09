'use client';
import React, { act, useContext } from 'react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { useRouter } from 'next/navigation';
import { useAuth, UserButton } from '@clerk/nextjs';
import { Rocket, Download } from "lucide-react";
import { ActionContext } from '@/context/ActionContext';
import { SidebarTrigger } from '../ui/sidebar';


export default function Header() {
  const router = useRouter();
  const { userId } = useAuth();
  const { action, setAction } = useContext(ActionContext);
  const onActionBtn = (action) => {
    console.log(`Button clicked: ${action}`);
    setAction({
      actionType: action,
      timeStamp: Date.now()
    })
  }
  const context = useContext(ActionContext);
  console.log("ActionContext:", context); // Xem thử có undefined không

  if (!context) {
    throw new Error("ActionContext must be used within an ActionProvider");
  }

  return (
    <nav className="relative flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold"> <SidebarTrigger />Builder</div>
      <div className="flex items-center gap-4">
        <UserButton />

        {userId ? (
          <>
            <Button
              onClick={() => onActionBtn('deploy')}
              size="sm"
              className="px-4 py-2 text-sm font-medium flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:bg-blue-600"
            >
              <Rocket size={16} /> Deploy
            </Button>
            <Button
              onClick={() => onActionBtn('export')}
              variant="outline"
              size="sm"
              className="px-4 py-2 text-sm font-medium flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:bg-gray-200"
            >
              <Download size={16} /> Export
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => router.push('/sign-in')}
              variant="outline"
              size="sm"
            >
              Sign in
            </Button>
            <Button onClick={() => router.push('/sign-up')} size="sm">
              Sign up
            </Button>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
