"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardTable() {
  // Gọi API để lấy 5 khách hàng mới nhất đã mua gói
  const latestCustomers = useQuery(api.orders.getLatestCustomers) || [];
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Khách hàng gần đây</CardTitle>
        <CardDescription>Khách hàng đăng kí gần đây nhất.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestCustomers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.plan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

