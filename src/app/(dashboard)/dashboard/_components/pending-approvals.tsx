// components/dashboard/PendingApprovals.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

const pendingCleaners = [
  { id: 1, name: "Cameron Williamson", role: "Product Designer" },
  { id: 2, name: "Cameron Williamson", role: "Product Designer" },
  { id: 3, name: "Cameron Williamson", role: "Product Designer" },
  { id: 4, name: "Cameron Williamson", role: "Product Designer" },
  { id: 5, name: "Cameron Williamson", role: "Product Designer" },
];

export default function 

PendingApprovals() {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Pending Cleaners Approvals</CardTitle>
          <CardDescription>Approve pending professional profiles.</CardDescription>
        </div>
        <Link href="#" className="text-sm font-medium text-emerald-600 hover:underline">See all</Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingCleaners.map((cleaner, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-slate-100">
                <AvatarImage src="/cleaner-placeholder.png" />
                <AvatarFallback>CW</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-900">{cleaner.name}</p>
                <p className="text-xs text-muted-foreground">{cleaner.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}