"use client"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

// Sample data for the revenue chart
const revenueData = [
  { month: "Jan", revenue: 10800 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 12000 },
  { month: "Apr", revenue: 18000 },
  { month: "May", revenue: 16500 },
  { month: "Jun", revenue: 21000 },
  { month: "Jul", revenue: 25000 },
  { month: "Aug", revenue: 23000 },
  { month: "Sep", revenue: 28000 },
  { month: "Oct", revenue: 32000 },
  { month: "Nov", revenue: 38000 },
  { month: "Dec", revenue: 45000 },
]

// Sample data for the users chart
// const userData = [
//   { date: "2025-03-01", newUsers: 10, activeUsers: 10 },
//   { date: "2025-03-02", newUsers: 15, activeUsers: 25 },
//   { date: "2025-03-03", newUsers: 20, activeUsers: 45 },
//   { date: "2025-03-04", newUsers: 30, activeUsers: 75 },
//   { date: "2025-03-05", newUsers: 25, activeUsers: 100 },
//   { date: "2025-03-06", newUsers: 18, activeUsers: 118 },
//   { date: "2025-03-07", newUsers: 22, activeUsers: 140 },
//   { date: "2025-03-08", newUsers: 28, activeUsers: 168 },
//   { date: "2025-03-09", newUsers: 35, activeUsers: 203 },
//   { date: "2025-03-10", newUsers: 40, activeUsers: 243 },
//   { date: "2025-03-11", newUsers: 50, activeUsers: 293 },
//   { date: "2025-03-12", newUsers: 60, activeUsers: 353 },
// ];

// Chart configurations
const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}
const userChartConfig = {
  newUsers: {
    label: "New Users",
    color: "hsl(var(--chart-2))",
  },
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--chart-1))",
  },
}
// Format currency for tooltips
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function DashboardCharts() {
  const userData = useQuery(api.users.getUserStats);
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Tổng quan</CardTitle>
        <CardDescription>Xem biểu đồ thống kê đoanh thu và người dùng.</CardDescription>
        <Tabs defaultValue="revenue" className="mt-4">
          <TabsList>
            <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue" className="pt-4">
            <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
              <AreaChart data={revenueData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
                <YAxis
                  className="text-xs text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="users" className="pt-4">
            <ChartContainer config={userChartConfig} className="h-[300px] w-full">
              <BarChart
                data={userData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                barGap={6} // Tạo khoảng cách giữa các cột
                barCategoryGap={30} // Điều chỉnh khoảng cách nhóm cột
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  className="text-xs text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="newUsers" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="activeUsers" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}

