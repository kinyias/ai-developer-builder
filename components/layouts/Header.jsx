'use client';
import React from 'react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { useRouter } from 'next/navigation';
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Header() {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <nav className="relative flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">Builder</div>
      <div className="flex items-center gap-4">
        <UserButton />
        {!userId && (
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
        {/* <Button variant="ghost">Sign In</Button>
        <Button>Get Started</Button> */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
