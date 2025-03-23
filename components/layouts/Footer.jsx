import React from 'react';
import { Button } from '../ui/button';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t p-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="link" size="sm">
            <Link href="/pricing">Bảng giá</Link>
          </Button>
          <Button variant="link" size="sm">
          <Link href="/contact">Liên hệ</Link>
          </Button>
          <Button variant="link" size="sm">
          <Link href="/about">Về chúng tôi</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500 dark:text-yellow-300" />
          <span className="font-semibold">Nhóm 4</span>
        </div>
      </div>
    </footer>
  );
}
