import React from 'react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  return (
    <nav className="relative flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">Builder</div>
      <div className="flex items-center gap-4">
       
        <Button variant="ghost">Sign In</Button>
        <Button>Get Started</Button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
