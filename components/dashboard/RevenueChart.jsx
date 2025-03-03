"use client"

import * as React from "react"
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for detailed revenue chart
const detailedRevenueData = [
  { date: "2023-01-01", subscriptions: 8500, oneTime: 2300, total: 10800 },
  { date: "2023-02-01", subscriptions: 10200, oneTime: 4300, total: 14500 },
  { date: "2023-03-01", subscriptions: 9800, oneTime: 2200, total: 12000 },
  { date: "2023-04-01", subscriptions: 12500, oneTime: 5500, total: 18000 },
  { date: "2023-05-01", subscriptions: 13200, oneTime: 3300, total: 16500 },
  { date: "2023-06-01", subscriptions: 15800, oneTime: 5200, total: 21000 },
  { date: "2023-07-01", subscriptions: 18500, oneTime: 6500, total: 25000 },
  { date: "2023-08-01", subscriptions: 17800, oneTime: 5200, total: 23000 },
  { date: "2023-09-01", subscriptions: 21500, oneTime: 6500, total: 28000 },
  { date: "2023-10-01", subscriptions: 24800, oneTime: 7200, total: 32000 },
  { date: "2023-11-01", subscriptions: 29500, oneTime: 8500, total: 38000 },
  { date: "2023-12-01", subscriptions: 35000, oneTime: 10000, total: 45000 },
]

// Chart configuration
const detailedRevenueChartConfig = {
  total: {
    label: "Total Revenue",
    color: "hsl(var(--chart-1))",
  },
  subscriptions: {
    label: "Subscription Revenue",
    color: "hsl(var(--chart-2))",
  },
  oneTime: {
    label: "One-time Purchases",
    color: "hsl(var(--chart-3))",
  },
}
// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Format currency for tooltips
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function RevenueChart() {
  const [timeRange, setTimeRange] = React.useState("12m")
  
  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    switch (timeRange) {
      case "3m":
        return detailedRevenueData.slice(-3)
      case "6m":
        return detailedRevenueData.slice(-6)
      case "ytd":
        const currentYear = new Date().getFullYear()
        return detailedRevenueData.filter(item => 
          new Date(item.date).getFullYear() === currentYear
        )
      case "12m":
      default:
        return detailedRevenueData
    }
  }, [timeRange])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>
            Detailed view of revenue sources over time
          </CardDescription>
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
        <ChartContainer config={detailedRevenueChartConfig} className="h-[350px] w-full">
          <LineChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                  labelFormatter={(label) => formatDate(String(label))}
                />
              }
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="subscriptions" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="oneTime" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Legend />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
