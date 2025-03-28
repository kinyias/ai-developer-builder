'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

// Sample data for support tickets
// const tickets = [
//   {
//     id: "TKT-1001",
//     subject: "Cannot access my account",
//     customer: {
//       name: "Sarah Johnson",
//       email: "sarah@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "open",
//     priority: "high",
//     category: "Account Access",
//     createdAt: "2024-03-15T10:30:00Z",
//     lastUpdated: "2024-03-15T10:30:00Z",
//     responseTime: null,
//   },
//   {
//     id: "TKT-1002",
//     subject: "Billing discrepancy on latest invoice",
//     customer: {
//       name: "Michael Brown",
//       email: "michael@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "in-progress",
//     priority: "medium",
//     category: "Billing",
//     createdAt: "2024-03-14T15:45:00Z",
//     lastUpdated: "2024-03-15T09:20:00Z",
//     responseTime: "1h 35m",
//   },
//   {
//     id: "TKT-1003",
//     subject: "How to integrate API with my application",
//     customer: {
//       name: "Emily Davis",
//       email: "emily@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "waiting",
//     priority: "low",
//     category: "API",
//     createdAt: "2024-03-13T11:15:00Z",
//     lastUpdated: "2024-03-14T14:30:00Z",
//     responseTime: "3h 15m",
//   },
//   {
//     id: "TKT-1004",
//     subject: "Service outage affecting my workflow",
//     customer: {
//       name: "Robert Wilson",
//       email: "robert@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "open",
//     priority: "urgent",
//     category: "Service Disruption",
//     createdAt: "2024-03-15T08:10:00Z",
//     lastUpdated: "2024-03-15T08:10:00Z",
//     responseTime: null,
//   },
//   {
//     id: "TKT-1005",
//     subject: "Feature request: Dark mode for dashboard",
//     customer: {
//       name: "Jennifer Taylor",
//       email: "jennifer@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "in-progress",
//     priority: "low",
//     category: "Feature Request",
//     createdAt: "2024-03-12T16:20:00Z",
//     lastUpdated: "2024-03-14T11:45:00Z",
//     responseTime: "19h 25m",
//   },
//   {
//     id: "TKT-1006",
//     subject: "Data export functionality not working",
//     customer: {
//       name: "David Miller",
//       email: "david@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "resolved",
//     priority: "medium",
//     category: "Bug Report",
//     createdAt: "2024-03-10T09:30:00Z",
//     lastUpdated: "2024-03-13T14:15:00Z",
//     responseTime: "4h 45m",
//   },
//   {
//     id: "TKT-1007",
//     subject: "Need help with onboarding new team members",
//     customer: {
//       name: "Lisa Anderson",
//       email: "lisa@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "closed",
//     priority: "medium",
//     category: "Onboarding",
//     createdAt: "2024-03-08T13:40:00Z",
//     lastUpdated: "2024-03-11T10:20:00Z",
//     responseTime: "2h 40m",
//   },
//   {
//     id: "TKT-1008",
//     subject: "Security concern regarding user permissions",
//     customer: {
//       name: "James Wilson",
//       email: "james@example.com",
//       avatar: "/placeholder.svg?height=32&width=32",
//     },
//     status: "open",
//     priority: "high",
//     category: "Security",
//     createdAt: "2024-03-15T07:50:00Z",
//     lastUpdated: "2024-03-15T07:50:00Z",
//     responseTime: null,
//   },
// ]

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get status badge variant
const getStatusBadgeVariant = (status) => {
  if (status) {
    return 'bg-blue-100 text-blue-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
};

export function TicketsTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const tickets = useQuery(api.tickets.GetAllTickets) || [];
  console.log(tickets);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const paginatedTickets = tickets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleViewTicket = (id) => {
    router.push(`/dashboard/tickets/${id}`);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Tên khách hàng
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Tạo
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="cursor-pointer"
                onClick={() => handleViewTicket(ticket.id)}
              >
                <TableCell className="font-medium">{ticket._id}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {ticket.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {ticket.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusBadgeVariant(ticket.status)}
                  >
                    {ticket.status ? 'Chờ xử lý' : 'Đã xử lý'}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(ticket._creationTime)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewTicket(ticket.id);
                        }}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Assign to me
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Mark as resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Close ticket
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-4">
          <div className="text-sm text-muted-foreground">
            Showing{' '}
            <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(page * itemsPerPage, tickets.length)}
            </span>{' '}
            of <span className="font-medium">{tickets.length}</span> tickets
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="text-sm font-medium">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
