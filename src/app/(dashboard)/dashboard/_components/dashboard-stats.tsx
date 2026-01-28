import React from 'react';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,426",
      trend: "+ 36%",
      isUp: true,
    },
    {
      title: "Total Service Provider",
      value: "12,426",
      trend: "- 14%",
      isUp: false,
    },
    {
      title: "Total Bookings",
      value: "12,426",
      trend: "+ 36%",
      isUp: true,
    },
    {
      title: "Total Earnings",
      value: "$12,426",
      trend: "+ 36%",
      isUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            {/* Label */}
            <p className="text-xs font-medium text-muted-foreground mb-6">
              {stat.title}
            </p>
            
            {/* Value and Trend Row */}
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </h3>
              
              <div className={`flex items-center text-sm font-semibold ${
                stat.isUp ? "text-emerald-500" : "text-rose-500"
              }`}>
                <span>{stat.trend}</span>
                {stat.isUp ? (
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="ml-1 h-4 w-4" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;