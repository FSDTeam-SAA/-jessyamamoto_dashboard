"use client"
import React from 'react'
import DynamicPageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, EyeIcon, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const servicesData = [
  {
    id: 1,
    provider: "Haris Wikestion",
    providerAvatar: "https://github.com/shadcn.png",
    serviceName: "Cleaning",
    customerName: "Olivia Rhye",
    customerEmail: "example@gmail.com",
    phoneNumber: "+02463245",
    date: "11/7/16",
    status: "Completed",
  },
  {
    id: 2,
    provider: "John Carter",
    providerAvatar: "https://github.com/shadcn.png",
    serviceName: "Caregiving",
    customerName: "Emma Watson",
    customerEmail: "emma@example.com",
    phoneNumber: "+8801712345678",
    date: "12/1/16",
    status: "Pending",
  },
  {
    id: 3,
    provider: "Sophia Lee",
    providerAvatar: "https://github.com/shadcn.png",
    serviceName: "Medical",
    customerName: "Robert Fox",
    customerEmail: "robert@example.com",
    phoneNumber: "+8801919988776",
    date: "12/5/16",
    status: "Completed",
  },
]


const BookingData = () => {
  return (
    <div className=" min-h-screen">
      {/* Header Section */}
      <div className="flex px-8 py-4 justify-between items-start mb-8">
        <DynamicPageHeader pageTitle="Registration Requests" />

        <div className="flex w-full max-w-sm items-center overflow-hidden rounded-lg border border-[#666666] focus-within:ring-1 focus-within:ring-ring">
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search by Category Name"
            className="border-0 bg-transparent py-6 text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          {/* Search Button */}
          <Button
            type="submit"
            size="icon"
            className="h-12 w-16 rounded-none bg-[#003366] hover:bg-[#002855] transition-colors"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border-t border-[#B6B6B6] rounded-sm">
        <Table >
          <TableHeader className="">
            <TableRow className="hover:bg-transparent border-[#B6B6B6] ">
              <TableHead className="py-4 font-bold px-8 text-slate-800"> Service Provider </TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Services Name </TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Customer </TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Phone Number </TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Date </TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Action </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicesData.map((service) => (
              <TableRow key={service.id} className="border-b border-[#B6B6B6]">
                <TableCell className="py-6 font-medium px-8 text-slate-700">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {service?.provider}
                  </div>
                </TableCell>
                <TableCell className="py-6 text-center px-8 text-slate-600">{service.serviceName}</TableCell>
                <TableCell className="py-6 text-center px-8 text-slate-600">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start gap-1'>
                      <span>  {service?.customerName}</span>
                      <span>  {service?.customerEmail}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 text-center px-8 text-slate-600">{service.phoneNumber}</TableCell>

                <TableCell className="py-6 text-center px-8 text-slate-600">{service.date}</TableCell>
                <TableCell className="py-6 px-8">
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-white py-1 px-2 text-[12px] rounded-full bg-[#008000] hover:bg-[#008000]/80 transition-colors">
                      Completed
                    </button>
                    <button className="text-white py-1 px-2 rounded-md bg-[#003366] hover:bg-[#003366]/80 transition-colors">
                      <EyeIcon className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Section */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-[#FFFFFF]">
          <p className="text-sm text-slate-500">
            Showing 1 to 5 of 12 results
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 bg-slate-50 border-slate-200">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm" className="h-8 w-8 bg-[#00315C] text-white">
              1
            </Button>
            {[2, 3].map((page) => (
              <Button key={page} variant="outline" size="sm" className="h-8 w-8 border-slate-200 text-slate-600">
                {page}
              </Button>
            ))}
            <span className="px-2 text-slate-400 text-sm">...</span>
            <Button variant="outline" size="sm" className="h-8 w-8 border-slate-200 text-slate-600">
              8
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 text-slate-600 border-slate-200">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingData