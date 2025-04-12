'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  Server,
  Users,
  Layers,
} from 'lucide-react';
import { DocsSidebar } from '@/components/docs/sidebar';

export default function ApiDocsPage() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

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
              <span className="font-medium text-foreground">API</span>
            </div>

            {/* Page title */}
            <div className="mb-4 flex flex-col items-start gap-1">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                API
              </h1>
              <p className="text-lg text-muted-foreground">
                Tài liệu về REST API.
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
                  AI Developer Builder API là RESTful API cho phép bạn tương tác
                  theo chương trình với nền tảng AI Developer Builder. Bạn có
                  thể sử dụng API để tạo chat, tạo code, thực hiện thanh toán
                  v.v..
                </p>
                <p className="leading-7 mb-4">
                  Dưới đây là một vài hướng dẫn về API.
                </p>
              </section>

              <section id="base-url" className="mb-10">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                  Base URL
                </h2>
                <p className="leading-7 mb-4">Tất yêu cầu API dựa trên URL:</p>
                <div className="relative rounded-md bg-muted p-4 font-mono text-sm mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                    onClick={() =>
                      copyToClipboard(
                        'https://ai-developer-builder.vercel.app',
                        'base-url'
                      )
                    }
                  >
                    {copied === 'base-url' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code>https://ai-developer-builder.vercel.app</code>
                </div>
                <p className="leading-7 mb-4">
                  Ví dụ, bạn muốn nhập prompt và lấy thông tin response chat,
                  bạn sẽ tạo POST request đến:
                </p>
                <div className="relative rounded-md bg-muted p-4 font-mono text-sm">
                  <code>https://ai-developer-builder.vercel.app/ai-chat</code>
                </div>
              </section>

              <section id="endpoints" className="mb-10">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                  Endpoints
                </h2>
                <p className="leading-7 mb-4">
                  AI Developer Builder cung cấp các endpoints để quản lý nhiều
                  tài nguyên khác nhau. Dưới đây là tóm tắt về các endpoints có
                  sẵn..
                </p>

                <h3
                  id="projects-endpoints"
                  className="scroll-m-20 text-xl font-semibold tracking-tight mt-10 mb-4"
                >
                  Projects Endpoints
                </h3>
                <p className="leading-7 mb-4">
                  Projects are the core resource in the Bolt API. They represent
                  your applications and contain deployments, settings, and other
                  resources.
                </p>

                <Accordion type="single" collapsible className="w-full mb-6">
                  <AccordionItem value="list-projects">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs font-mono">
                          GET
                        </span>
                        <span className="font-mono text-sm">/projects</span>
                        <span className="text-muted-foreground text-sm">
                          List all projects
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                          Retrieves a list of all projects associated with your
                          account.
                        </p>

                        <div className="space-y-2">
                          <h4 className="font-medium">Query Parameters</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  page
                                </td>
                                <td className="border px-4 py-2">integer</td>
                                <td className="border px-4 py-2">
                                  Page number (default: 1)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  limit
                                </td>
                                <td className="border px-4 py-2">integer</td>
                                <td className="border px-4 py-2">
                                  Items per page (default: 20, max: 100)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  sort
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">
                                  Sort field (created_at, updated_at, name)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  order
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">
                                  Sort order (asc, desc)
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Example Response</h4>
                          <div className="relative rounded-md bg-muted p-4 font-mono text-sm">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                              onClick={() =>
                                copyToClipboard(
                                  '{\n  "data": [\n    {\n      "id": "proj_1a2b3c4d5e6f",\n      "name": "My Project",\n      "description": "A sample project",\n      "created_at": "2023-01-15T12:00:00Z",\n      "updated_at": "2023-01-20T15:30:00Z",\n      "status": "active"\n    },\n    {\n      "id": "proj_2b3c4d5e6f7g",\n      "name": "Another Project",\n      "description": "Another sample project",\n      "created_at": "2023-02-10T09:15:00Z",\n      "updated_at": "2023-02-12T14:45:00Z",\n      "status": "active"\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "total_pages": 5,\n    "total_count": 42,\n    "per_page": 10\n  }\n}',
                                  'response-list-projects'
                                )
                              }
                            >
                              {copied === 'response-list-projects' ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <code>
                              {'{'}
                              <br />
                              &nbsp;&nbsp;"data": [<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":
                              "proj_1a2b3c4d5e6f",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "My
                              Project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description":
                              "A sample project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"created_at":
                              "2023-01-15T12:00:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"updated_at":
                              "2023-01-20T15:30:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"status":
                              "active"
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":
                              "proj_2b3c4d5e6f7g",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                              "Another Project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description":
                              "Another sample project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"created_at":
                              "2023-02-10T09:15:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"updated_at":
                              "2023-02-12T14:45:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"status":
                              "active"
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                              <br />
                              &nbsp;&nbsp;],
                              <br />
                              &nbsp;&nbsp;"meta": {'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"current_page": 1,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"total_pages": 5,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"total_count": 42,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"per_page": 10
                              <br />
                              &nbsp;&nbsp;{'}'}
                              <br />
                              {'}'}
                              <br />
                            </code>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-project">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs font-mono">
                          GET
                        </span>
                        <span className="font-mono text-sm">/projects/:id</span>
                        <span className="text-muted-foreground text-sm">
                          Get a project
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                          Retrieves a specific project by its ID.
                        </p>

                        <div className="space-y-2">
                          <h4 className="font-medium">Path Parameters</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  id
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">Project ID</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="create-project">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded text-xs font-mono">
                          POST
                        </span>
                        <span className="font-mono text-sm">/projects</span>
                        <span className="text-muted-foreground text-sm">
                          Create a project
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                          Creates a new project.
                        </p>

                        <div className="space-y-2">
                          <h4 className="font-medium">Request Body</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Required
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  name
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">Yes</td>
                                <td className="border px-4 py-2">
                                  Project name
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  description
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">No</td>
                                <td className="border px-4 py-2">
                                  Project description
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  repository
                                </td>
                                <td className="border px-4 py-2">object</td>
                                <td className="border px-4 py-2">No</td>
                                <td className="border px-4 py-2">
                                  Repository information
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  environment_variables
                                </td>
                                <td className="border px-4 py-2">array</td>
                                <td className="border px-4 py-2">No</td>
                                <td className="border px-4 py-2">
                                  Environment variables
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Example Response</h4>
                          <div className="relative rounded-md bg-muted p-4 font-mono text-sm">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                              onClick={() =>
                                copyToClipboard(
                                  '{\n  "data": [\n    {\n      "id": "proj_1a2b3c4d5e6f",\n      "name": "My Project",\n      "description": "A sample project",\n      "created_at": "2023-01-15T12:00:00Z",\n      "updated_at": "2023-01-20T15:30:00Z",\n      "status": "active"\n    },\n    {\n      "id": "proj_2b3c4d5e6f7g",\n      "name": "Another Project",\n      "description": "Another sample project",\n      "created_at": "2023-02-10T09:15:00Z",\n      "updated_at": "2023-02-12T14:45:00Z",\n      "status": "active"\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "total_pages": 5,\n    "total_count": 42,\n    "per_page": 10\n  }\n}',
                                  'response-list-projects'
                                )
                              }
                            >
                              {copied === 'response-list-projects' ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <code>
                              {'{'}
                              <br />
                              &nbsp;&nbsp;"data": [<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":
                              "proj_1a2b3c4d5e6f",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "My
                              Project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description":
                              "A sample project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"created_at":
                              "2023-01-15T12:00:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"updated_at":
                              "2023-01-20T15:30:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"status":
                              "active"
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":
                              "proj_2b3c4d5e6f7g",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                              "Another Project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description":
                              "Another sample project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"created_at":
                              "2023-02-10T09:15:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"updated_at":
                              "2023-02-12T14:45:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"status":
                              "active"
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                              <br />
                              &nbsp;&nbsp;],
                              <br />
                              &nbsp;&nbsp;"meta": {'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"current_page": 1,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"total_pages": 5,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"total_count": 42,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"per_page": 10
                              <br />
                              &nbsp;&nbsp;{'}'}
                              <br />
                              {'}'}
                              <br />
                            </code>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h3
                  id="deployments-endpoints"
                  className="scroll-m-20 text-xl font-semibold tracking-tight mt-10 mb-4"
                >
                  Deployments Endpoints
                </h3>
                <p className="leading-7 mb-4">
                  Deployments represent instances of your projects that are
                  running in production or preview environments.
                </p>

                <Accordion type="single" collapsible className="w-full mb-6">
                  <AccordionItem value="list-deployments">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs font-mono">
                          GET
                        </span>
                        <span className="font-mono text-sm">
                          /projects/:id/deployments
                        </span>
                        <span className="text-muted-foreground text-sm">
                          List deployments
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                          Retrieves a list of deployments for a specific
                          project.
                        </p>

                        <div className="space-y-2">
                          <h4 className="font-medium">Path Parameters</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  id
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">Project ID</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Query Parameters</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  page
                                </td>
                                <td className="border px-4 py-2">integer</td>
                                <td className="border px-4 py-2">
                                  Page number (default: 1)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  limit
                                </td>
                                <td className="border px-4 py-2">integer</td>
                                <td className="border px-4 py-2">
                                  Items per page (default: 20, max: 100)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  status
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">
                                  Filter by status (building, ready, error)
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Example Response</h4>
                          <div className="relative rounded-md bg-muted p-4 font-mono text-sm">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                              onClick={() =>
                                copyToClipboard(
                                  '{\n  "data": [\n    {\n      "id": "proj_1a2b3c4d5e6f",\n      "name": "My Project",\n      "description": "A sample project",\n      "created_at": "2023-01-15T12:00:00Z",\n      "updated_at": "2023-01-20T15:30:00Z",\n      "status": "active"\n    },\n    {\n      "id": "proj_2b3c4d5e6f7g",\n      "name": "Another Project",\n      "description": "Another sample project",\n      "created_at": "2023-02-10T09:15:00Z",\n      "updated_at": "2023-02-12T14:45:00Z",\n      "status": "active"\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "total_pages": 5,\n    "total_count": 42,\n    "per_page": 10\n  }\n}',
                                  'response-list-projects'
                                )
                              }
                            >
                              {copied === 'response-list-projects' ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <code>
                              {'{'}
                              <br />
                              &nbsp;&nbsp;"data": [<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":
                              "proj_1a2b3c4d5e6f",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "My
                              Project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description":
                              "A sample project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"created_at":
                              "2023-01-15T12:00:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"updated_at":
                              "2023-01-20T15:30:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"status":
                              "active"
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":
                              "proj_2b3c4d5e6f7g",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                              "Another Project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description":
                              "Another sample project",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"created_at":
                              "2023-02-10T09:15:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"updated_at":
                              "2023-02-12T14:45:00Z",
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"status":
                              "active"
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                              <br />
                              &nbsp;&nbsp;],
                              <br />
                              &nbsp;&nbsp;"meta": {'{'}
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"current_page": 1,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"total_pages": 5,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"total_count": 42,
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;"per_page": 10
                              <br />
                              &nbsp;&nbsp;{'}'}
                              <br />
                              {'}'}
                              <br />
                            </code>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="create-deployment">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded text-xs font-mono">
                          POST
                        </span>
                        <span className="font-mono text-sm">
                          /projects/:id/deployments
                        </span>
                        <span className="text-muted-foreground text-sm">
                          Create a deployment
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                          Creates a new deployment for a specific project.
                        </p>

                        <div className="space-y-2">
                          <h4 className="font-medium">Path Parameters</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  id
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">Project ID</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Request Body</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Required
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  branch
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">Yes</td>
                                <td className="border px-4 py-2">
                                  Git branch to deploy
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  commit_hash
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">No</td>
                                <td className="border px-4 py-2">
                                  Specific commit to deploy (defaults to latest)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  environment_variables
                                </td>
                                <td className="border px-4 py-2">array</td>
                                <td className="border px-4 py-2">No</td>
                                <td className="border px-4 py-2">
                                  Environment variables for this deployment
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h3
                  id="users-endpoints"
                  className="scroll-m-20 text-xl font-semibold tracking-tight mt-10 mb-4"
                >
                  Users Endpoints
                </h3>
                <p className="leading-7 mb-4">
                  Users endpoints allow you to manage users and their
                  permissions within your organization.
                </p>

                <Accordion type="single" collapsible className="w-full mb-6">
                  <AccordionItem value="list-users">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs font-mono">
                          GET
                        </span>
                        <span className="font-mono text-sm">/users</span>
                        <span className="text-muted-foreground text-sm">
                          List users
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                          Retrieves a list of users in your organization.
                        </p>

                        <div className="space-y-2">
                          <h4 className="font-medium">Query Parameters</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  page
                                </td>
                                <td className="border px-4 py-2">integer</td>
                                <td className="border px-4 py-2">
                                  Page number (default: 1)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  limit
                                </td>
                                <td className="border px-4 py-2">integer</td>
                                <td className="border px-4 py-2">
                                  Items per page (default: 20, max: 100)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  role
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">
                                  Filter by role (admin, member)
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="invite-user">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded text-xs font-mono">
                          POST
                        </span>
                        <span className="font-mono text-sm">/users/invite</span>
                        <span className="text-muted-foreground text-sm">
                          Invite a user
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-muted-foreground">
                          Invites a new user to your organization.
                        </p>

                        <div className="space-y-2">
                          <h4 className="font-medium">Request Body</h4>
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2 text-left">
                                  Parameter
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Type
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Required
                                </th>
                                <th className="border px-4 py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  email
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">Yes</td>
                                <td className="border px-4 py-2">
                                  Email address of the user to invite
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  role
                                </td>
                                <td className="border px-4 py-2">string</td>
                                <td className="border px-4 py-2">Yes</td>
                                <td className="border px-4 py-2">
                                  Role to assign (admin, member)
                                </td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-2 font-mono">
                                  project_ids
                                </td>
                                <td className="border px-4 py-2">array</td>
                                <td className="border px-4 py-2">No</td>
                                <td className="border px-4 py-2">
                                  Projects to grant access to
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <section id="error-handling" className="mb-10">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                  Error Handling
                </h2>
                <p className="leading-7 mb-4">
                  The API uses conventional HTTP response codes to indicate the
                  success or failure of an API request.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 text-left">Code</th>
                        <th className="border px-4 py-2 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">200 - OK</td>
                        <td className="border px-4 py-2">
                          The request was successful.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">201 - Created</td>
                        <td className="border px-4 py-2">
                          The resource was successfully created.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">400 - Bad Request</td>
                        <td className="border px-4 py-2">
                          The request was invalid or cannot be otherwise served.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">401 - Unauthorized</td>
                        <td className="border px-4 py-2">
                          Authentication credentials were missing or invalid.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">403 - Forbidden</td>
                        <td className="border px-4 py-2">
                          The request is understood, but it has been refused or
                          access is not allowed.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">404 - Not Found</td>
                        <td className="border px-4 py-2">
                          The requested resource does not exist.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          429 - Too Many Requests
                        </td>
                        <td className="border px-4 py-2">
                          You have exceeded the rate limit.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">500 - Server Error</td>
                        <td className="border px-4 py-2">
                          Something went wrong on our end.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4">
                  Error Response Format
                </h3>
                <p className="leading-7 mb-4">
                  When an error occurs, the API will return a JSON response with
                  an error object:
                </p>

                <div className="relative rounded-md bg-muted p-4 font-mono text-sm mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-70 hover:opacity-100"
                    onClick={() =>
                      copyToClipboard(
                        '{\n  "error": {\n    "code": "invalid_request",\n    "message": "The request was invalid.",\n    "details": [\n      {\n        "field": "name",\n        "message": "Name is required."\n      }\n    ]\n  }\n}',
                        'error-response'
                      )
                    }
                  >
                    {copied === 'error-response' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code>
                    {'{'}
                    <br />
                    &nbsp;&nbsp;"error": {'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"code": "invalid_request",
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"message": "The request was
                    invalid.",
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"details": [<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"field":
                    "name",
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message":
                    "Name is required."
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;]
                    <br />
                    &nbsp;&nbsp;{'}'}
                    <br />
                    {'}'}
                    <br />
                  </code>
                </div>

                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4">
                  Common Error Codes
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 text-left">
                          Error Code
                        </th>
                        <th className="border px-4 py-2 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-mono">
                          invalid_request
                        </td>
                        <td className="border px-4 py-2">
                          The request was invalid.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-mono">
                          authentication_required
                        </td>
                        <td className="border px-4 py-2">
                          Authentication is required.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-mono">
                          invalid_token
                        </td>
                        <td className="border px-4 py-2">
                          The API key provided is invalid.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-mono">
                          forbidden
                        </td>
                        <td className="border px-4 py-2">
                          You don't have permission to access this resource.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-mono">
                          not_found
                        </td>
                        <td className="border px-4 py-2">
                          The requested resource was not found.
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-mono">
                          server_error
                        </td>
                        <td className="border px-4 py-2">
                          An error occurred on our servers.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
