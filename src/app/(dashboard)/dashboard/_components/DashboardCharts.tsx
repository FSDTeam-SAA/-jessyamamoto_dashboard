"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const earningsData = [
  { month: "Feb", earnings: 15000 },
  { month: "Mar", earnings: 18000 },
  { month: "Apr", earnings: 14000 },
  { month: "May", earnings: 22000 },
  { month: "Jun", earnings: 25000 },
  { month: "Jul", earnings: 23000 },
  { month: "Aug", earnings: 26000 },
  { month: "Sep", earnings: 24000 },
  { month: "Oct", earnings: 32000 },
  { month: "Nov", earnings: 35000 },
  { month: "Dec", earnings: 34000 },
  { month: "Jan", earnings: 42000 },
]

const earningsConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(221.2 83.2% 53.3%)", 
  },
} satisfies ChartConfig

// --- Data for Booking Distribution ---
const bookingData = [
  { service: "Service A", value: 100, fill: "#0095FF" }, // Light Blue
  { service: "Service B", value: 100, fill: "#00315C" }, // Dark Navy
  { service: "Service C", value: 100, fill: "#76D9D1" }, // Teal
  { service: "Service D", value: 100, fill: "#6A0DAD" }, // Purple
  { service: "Service E", value: 200, fill: "#FFD66B" }, // Yellow
]

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
      
      {/* --- Earnings Overview Chart (Left) --- */}
      <Card className="lg:col-span-2 border-none shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-10">
          <div className="grid gap-1">
            <CardTitle className="text-xl font-bold">Earnings Overview</CardTitle>
            <CardDescription>
              Track total revenue, platform commission, and payouts over time.
            </CardDescription>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[110px] h-8 text-xs">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={earningsConfig} className="h-[400px] w-full">
            <AreaChart data={earningsData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                className="text-xs text-muted-foreground"
              />
              <ChartTooltip
              
                cursor={false}
                content={<ChartTooltipContent className="w-32 " hideLabel indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#00315C"
                strokeWidth={2}
                fill="#F8FAFC" // Soft light fill to match image background
                fillOpacity={0.8}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* --- Booking Distribution Chart (Right) --- */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-10">
          <div className="grid gap-1">
            <CardTitle className="text-xl font-bold">Booking Distribution</CardTitle>
            <CardDescription>
              See which services are booked the most by users.
            </CardDescription>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[110px] h-8 text-xs">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
              <PieChart>
                <Pie
                  data={bookingData}
                  dataKey="value"
                  nameKey="service"
                  innerRadius={60}
                  outerRadius={100}
                  strokeWidth={0}
                >
                  {bookingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            
            {/* Custom Legend to match image */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-3 mt-8 w-full px-2">
              {bookingData.concat(bookingData).slice(0, 9).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    Service Name
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}