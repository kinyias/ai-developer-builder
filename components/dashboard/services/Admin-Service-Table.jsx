"use client"

import { useState } from "react"
import { MoreHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"

//import cac ham lien quan convex
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
//import { getAllUsers } from "../../../convex/users"; // Import hàm getAllUsers từ file users.js
import { findPlanByPrice } from "../../../convex/orders";

// Sample data for registered services
// const services = [
//   {
//     id: "SRV-001",
//     user: "Sarah Johnson",
//     email: "sarah@example.com",
//     registeredDate: "2023-12-10",
//     expiryDate: "2024-12-10",
//     status: "active",
//     plan: "Enterprise",
//   },
//   {
//     id: "SRV-002",
//     user: "Michael Brown",
//     email: "michael@example.com",
//     registeredDate: "2023-11-15",
//     expiryDate: "2024-11-15",
//     status: "active",
//     plan: "Pro",
//   },
//   {
//     id: "SRV-003",
//     user: "Emily Davis",
//     email: "emily@example.com",
//     registeredDate: "2023-12-05",
//     expiryDate: "2024-12-05",
//     status: "pending",
//     plan: "Enterprise",
//   },
//   {
//     id: "SRV-004",
//     user: "Robert Wilson",
//     email: "robert@example.com",
//     registeredDate: "2023-10-20",
//     expiryDate: "2024-10-20",
//     status: "active",
//     plan: "Pro",
//   },
//   {
//     id: "SRV-005",
//     user: "Jennifer Taylor",
//     email: "jennifer@example.com",
//     registeredDate: "2023-09-30",
//     expiryDate: "2024-09-30",
//     status: "suspended",
//     plan: "Basic",
//   },
//   {
//     id: "SRV-006",
//     user: "David Miller",
//     email: "david@example.com",
//     registeredDate: "2023-11-25",
//     expiryDate: "2024-11-25",
//     status: "active",
//     plan: "Enterprise",
//   },
//   {
//     id: "SRV-007",
//     user: "Lisa Anderson",
//     email: "lisa@example.com",
//     registeredDate: "2023-12-01",
//     expiryDate: "2024-12-01",
//     status: "pending",
//     plan: "Pro",
//   },
// ]

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function AdminServicesTable({searchResults=[]}) {
  const users = useQuery(api.users.getAllUsers) || [];
  const orders = useQuery(api.orders.getAllOrders) || [];

  if (!users || !orders) return <div>Loading...</div>;

  // Map user data with their orders
  const services = orders.map((order) => {
    const user = users.find((u) => u._id === order.userId);
    return {
      id: order._id,
      user: user?.name || "Unknown",
      email: user?.email || "N/A",
      registeredDate: order.createdAt,
      expiryDate: order.expiryDate, // TODO: Tính ngày hết hạn
      plan: findPlanByPrice(order.amount),
      // status: order.status || "Chưa xử lý", // TODO: Kiểm tra trạng thái từ đơn hàng
    };
  });

  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(services.length / itemsPerPage)

  const paginatedServices = services.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  };

  const displayData = searchResults.length > 0 ? searchResults : services;
  if (!users && !orders && searchResults.length === 0) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Ngày đăng kí</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((service, index) => (
              <TableRow key={service.orderId || service._id || index}>
                <TableCell className="font-medium">
                  {/* {service._id.length > 10
                    ? service._id.slice(0, 10) + '...'
                    : service._id} */}
                  {(service.userId || service._id)
                    ? (service.userId || service._id).length > 10
                      ? (service.userId || service._id).slice(0, 10) + '...'
                      : (service.userId || service._id)
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{service.user || service.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {service.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(service.registeredDate)}</TableCell>
                <TableCell>{formatDate(service.expiryDate)}</TableCell>
                <TableCell>{service.plan}</TableCell>
                <TableCell>
                  {/* {service.orders[0]
                    ? formatDate(service.orders[0].createdAt)
                    : 'N/A'} */}
                  {service.registeredDate || (service.orders && service.orders[0]?.createdAt)
                    ? formatDate(service.registeredDate || service.orders[0].createdAt)
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {/* {service.orders[0]
                    ? formatDate(service.orders[0].expiryDate)
                    : 'N/A'} */}
                  {service.expiryDate || (service.orders && service.orders[0]?.expiryDate)
                    ? formatDate(service.expiryDate || service.orders[0].expiryDate)
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {/* {service.orders[0]
                    ? findPlanByPrice(service.orders[0].amount)
                    : 'N/A'} */}
                  {service.amount || (service.orders && service.orders[0]?.amount)
                    ? findPlanByPrice(service.amount || service.orders[0].amount)
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    // className={getStatusBadgeVariant(service.orders[0]?.status)}
                    className={getStatusBadgeVariant(service.status || (service.orders && service.orders[0]?.status))}
                  >
                    {/* {service.orders[0]?.status || 'Chưa có'} */}
                    {service.status || (service.orders && service.orders[0]?.status) || 'Chưa có'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                      <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                      <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Dừng</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Xoá</DropdownMenuItem>
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
            Hiển thị <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> đến{" "}
            <span className="font-medium">{Math.min(page * itemsPerPage, services.length)}</span> của {" "}
            <span className="font-medium">{services.length}</span> dịch vụ
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Trước</span>
            </Button>
            <div className="text-sm font-medium">
              Trang {page}/{totalPages}
            </div>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Sau</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

