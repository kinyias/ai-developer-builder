'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { DocsSidebar } from '@/components/docs/sidebar';

export default function DocsPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('npm');
  const pathname = usePathname();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Example TOC items for this page
  const tocItems = [
    {
      title: 'Introduction',
      url: '#introduction',
      items: [],
    },
    {
      title: 'Getting Started',
      url: '#getting-started',
      items: [
        {
          title: 'Installation',
          url: '#installation',
        },
        {
          title: 'Project Setup',
          url: '#project-setup',
        },
      ],
    },
    {
      title: 'Key Concepts',
      url: '#key-concepts',
      items: [],
    },
    {
      title: 'Examples',
      url: '#examples',
      items: [],
    },
    {
      title: 'Next Steps',
      url: '#next-steps',
      items: [],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr_250px] gap-0">
        {/* Sidebar */}
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block">
          <ScrollArea className="h-full py-6 pl-4 pr-6">
            <DocsSidebar />
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className="relative py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mx-auto w-full min-w-0">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
              <Link href="/docs" className="hover:text-foreground">
                Tài liệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href="/docs/getting-started"
                className="hover:text-foreground"
              >
                Bắt đầu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">Giới thiệu</span>
            </div>

            {/* Page title */}
            <div className="mb-4 flex flex-col items-start gap-1">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                Giới thiệu về AI Developer Builder
              </h1>
              <p className="text-lg text-muted-foreground">
                AI Developer Builder tạo ra trang web chỉ với vài dòng mô tả.
              </p>
            </div>

            <Separator className="my-6" />

            {/* Main content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <section id="introduction" className="mb-10">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                  Giới thiệu
                </h2>
                <p className="leading-7 mb-4">
                  AI Developer Builder là một nền tảng cho phép bạn nhắc nhở,
                  chạy, chỉnh sửa và triển khai các ứng dụng web và di động đầy
                  đủ. Nó được thiết kế để giúp phát triển nhanh hơn và dễ tiếp
                  cận hơn cho mọi người, từ người mới bắt đầu đến các nhà phát
                  triển có kinh nghiệm.
                </p>
              </section>

              <section id="getting-started" className="mb-10">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                  Bắt đầu
                </h2>
                <p className="leading-7 mb-4">
                  Bạn có thể bắt đầu bằng cách truy cập{' '}
                  <a
                    href="https://ai-developer-builder.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    AI Developer Builder
                  </a>
                  hoặc nếu bạn muốn cài đặt tại máy local thì theo hướng dẫn dưới đây.
                </p>

                <h3
                  id="installation"
                  className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4"
                >
                  Cài đặt
                </h3>
                <p className="leading-7 mb-4">
                  Đầu tiên bạn cần kéo source từ github về máy của bạn:
                </p>

                <div className="relative my-6">
                      <div className="relative rounded-md bg-muted p-4 font-mono text-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                          onClick={() =>
                            copyToClipboard('git clone https://github.com/kinyias/ai-developer-builder')
                          }
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <code>git clone https://github.com/kinyias/ai-developer-builder</code>
                      </div>
                </div>
                <p className="leading-7 mb-4">
                 Sau khi kéo source về bạn sẽ chạy lệnh npm để cài đặt các package:
                </p>

                <div className="relative rounded-md bg-muted p-4 font-mono text-sm my-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                    onClick={() => copyToClipboard('npm install')}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code>npm install</code>
                </div>
                
                <p className="leading-7 mb-4">
                 Bạn có thể chạy ngay với lệnh:
                </p>

                <div className="relative rounded-md bg-muted p-4 font-mono text-sm my-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                    onClick={() => copyToClipboard('npm run dev')}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code>npm run dev</code>
                </div>

                <p className="leading-7 mb-4">
                Điều này sẽ khởi động máy chủ phát triển và mở ứng dụng của bạn trong
                trình duyệt tại{' '}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    http://localhost:3000
                  </code>
                  .
                </p>

                <p className="leading-7 mb-4">
                 Hoặc để sát môi trường production và trải nghiệm tốt nhât bạn có thể:
                </p>

                <div className="relative rounded-md bg-muted p-4 font-mono text-sm my-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                    onClick={() => copyToClipboard('npm run build \n npm run start')}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code>npm run build</code> <br />
                  <code>npm run start</code>
                </div>
              </section>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}
