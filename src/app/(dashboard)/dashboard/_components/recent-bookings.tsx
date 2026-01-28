// components/dashboard/RecentBookings.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const bookings = [
  { id: 1, provider: "Olivia Rhye", email: "example@example.com", service: "Cleaning", customer: "Olivia Rhye", status: "Pending", date: "Jan 6, 2022" },
  { id: 2, provider: "Olivia Rhye", email: "example@example.com", service: "Cleaning", customer: "Olivia Rhye", status: "Cancel", date: "Jan 6, 2022" },
  { id: 3, provider: "Olivia Rhye", email: "example@example.com", service: "Cleaning", customer: "Olivia Rhye", status: "Completed", date: "Jan 6, 2022" },
  { id: 4, provider: "Olivia Rhye", email: "example@example.com", service: "Cleaning", customer: "Olivia Rhye", status: "Completed", date: "Jan 6, 2022" },
  { id: 5, provider: "Olivia Rhye", email: "example@example.com", service: "Cleaning", customer: "Olivia Rhye", status: "Completed", date: "Jan 6, 2022" },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Pending": return "bg-orange-50 text-orange-600 hover:bg-orange-50 border-none px-3";
    case "Cancel": return "bg-rose-50 text-rose-600 hover:bg-rose-50 border-none px-3";
    case "Completed": return "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none px-3";
    default: return "";
  }
};

export default function RecentBookings() {
  return (
    <Card className="lg:col-span-2  border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Recent Bookings</CardTitle>
          <CardDescription>View the latest customer appointments and their current status.</CardDescription>
        </div>
        <Link href="#" className="text-sm font-medium text-emerald-600 hover:underline">See all</Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-medium">Service Provider</TableHead>
              <TableHead className="font-medium">Service Name</TableHead>
              <TableHead className="font-medium">Customer</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id} className="border-b-slate-100 ">
                <TableCell>
                  <div className="flex items-center gap-3 py-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatar-placeholder.png" />
                      <AvatarFallback>OR</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{booking.provider}</span>
                      <span className="text-xs text-muted-foreground">{booking.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{booking.service}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatar-placeholder.png" />
                      <AvatarFallback>OR</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{booking.customer}</span>
                      <span className="text-xs text-muted-foreground">{booking.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusStyles(booking.status)}>{booking.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{booking.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}