"use client"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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
const userData = [
  { month: "Jan", newUsers: 120, activeUsers: 800 },
  { month: "Feb", newUsers: 180, activeUsers: 950 },
  { month: "Mar", newUsers: 150, activeUsers: 1100 },
  { month: "Apr", newUsers: 220, activeUsers: 1250 },
  { month: "May", newUsers: 250, activeUsers: 1400 },
  { month: "Jun", newUsers: 280, activeUsers: 1600 },
  { month: "Jul", newUsers: 300, activeUsers: 1850 },
  { month: "Aug", newUsers: 280, activeUsers: 2000 },
  { month: "Sep", newUsers: 320, activeUsers: 2200 },
  { month: "Oct", newUsers: 350, activeUsers: 2400 },
  { month: "Nov", newUsers: 380, activeUsers: 2600 },
  { month: "Dec", newUsers: 450, activeUsers: 3000 },
]

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
              <BarChart data={userData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
                <YAxis className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="newUsers" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="activeUsers" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}

