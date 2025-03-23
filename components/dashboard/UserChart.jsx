"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for user growth
const userGrowthData = [
  { date: "2023-01-01", newUsers: 120, totalUsers: 800, growthRate: 12.5 },
  { date: "2023-02-01", newUsers: 180, totalUsers: 950, growthRate: 18.8 },
  { date: "2023-03-01", newUsers: 150, totalUsers: 1100, growthRate: 15.8 },
  { date: "2023-04-01", newUsers: 220, totalUsers: 1250, growthRate: 13.6 },
  { date: "2023-05-01", newUsers: 250, totalUsers: 1400, growthRate: 12.0 },
  { date: "2023-06-01", newUsers: 280, totalUsers: 1600, growthRate: 14.3 },
  { date: "2023-07-01", newUsers: 300, totalUsers: 1850, growthRate: 15.6 },
  { date: "2023-08-01", newUsers: 280, totalUsers: 2000, growthRate: 8.1 },
  { date: "2023-09-01", newUsers: 320, totalUsers: 2200, growthRate: 10.0 },
  { date: "2023-10-01", newUsers: 350, totalUsers: 2400,growthRate: 9.1 },
  { date: "2023-11-01", newUsers: 380, totalUsers: 2600, growthRate: 8.3 },
  { date: "2023-12-01", newUsers: 450, totalUsers: 3000,  growthRate: 15.4 },
]

// Chart configurations
const userGrowthChartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
  newUsers: {
    label: "New Users",
    color: "hsl(var(--chart-2))",
  },
}

const growthRateChartConfig = {
  growthRate: {
    label: "Growth Rate (%)",
    color: "hsl(var(--chart-4))",
  },
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export default function UserChart() {
  const [timeRange, setTimeRange] = React.useState("12m")

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    switch (timeRange) {
      case "3m":
        return userGrowthData.slice(-3)
      case "6m":
        return userGrowthData.slice(-6)
      case "ytd":
        const currentYear = new Date().getFullYear()
        return userGrowthData.filter((item) => new Date(item.date).getFullYear() === currentYear)
      case "12m":
      default:
        return userGrowthData
    }
  }, [timeRange])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Detailed view of user acquisition and retention</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="ytd">Year to date</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users">
          <TabsList className="mb-4">
            <TabsTrigger value="users">User Count</TabsTrigger>
            <TabsTrigger value="growth">Growth Rate</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <ChartContainer config={userGrowthChartConfig} className="h-[350px] w-full">
              <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorTotalUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatDate}
                />
                <YAxis className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => formatDate(String(label))} />} />
                <Area
                  type="monotone"
                  dataKey="totalUsers"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorTotalUsers)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={1}
                  fill="url(#colorNewUsers)"
                  strokeWidth={2}
                />
                <Legend />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="growth">
            <ChartContainer config={growthRateChartConfig} className="h-[350px] w-full">
              <BarChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatDate}
                />
                <YAxis
                  className="text-xs text-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${Number(value).toFixed(1)}%`}
                      labelFormatter={(label) => formatDate(String(label))}
                    />
                  }
                />
                <Bar dataKey="growthRate" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

