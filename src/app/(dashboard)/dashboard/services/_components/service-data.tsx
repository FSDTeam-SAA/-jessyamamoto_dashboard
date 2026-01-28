"use client"

import React from 'react'
import {
  Plus,
  SquarePen,
  Trash2,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AddServiceModal from './add-component'

const servicesData = [
  { id: 1, name: "Caregiving", count: 10, date: "10/6/13" },
  { id: 2, name: "Cleaning", count: 10, date: "10/6/13" },
  { id: 3, name: "Tutoring", count: 10, date: "10/6/13" },
  { id: 4, name: "Medical", count: 10, date: "10/6/13" },
  { id: 5, name: "Drivers", count: 10, date: "10/6/13" },
  { id: 6, name: "Tour Guide", count: 10, date: "10/6/13" },
]

export default function ServicesPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className=" min-h-screen">
      {/* Header Section */}
      <div className="flex px-8 py-4 justify-between items-start mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-slate-400">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-400" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services" className="text-slate-400">Services</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Button onClick={()=>setIsOpen(true)} className="bg-[#00315C] hover:bg-[#00264d] text-white flex items-center gap-2 px-4 py-2 h-11">
          <Plus className="w-5 h-5" />
          Add Sub-Category Service
        </Button>
      </div>

      {/* Table Section */}
      <div className="border-t border-[#B6B6B6] rounded-sm">
        <Table >
          <TableHeader className="">
            <TableRow className="hover:bg-transparent border-[#B6B6B6] ">
              <TableHead className="py-4 font-bold px-8 text-slate-800">Service Category Name</TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center">Sub- Category Service</TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center">Date</TableHead>
              <TableHead className="py-4 font-bold px-8 text-slate-800 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicesData.map((service) => (
              <TableRow key={service.id} className="border-b border-[#B6B6B6]">
                <TableCell className="py-6 font-medium px-8 text-slate-700">{service.name}</TableCell>
                <TableCell className="py-6 text-center px-8 text-slate-600">{service.count}</TableCell>
                <TableCell className="py-6 text-center px-8 text-slate-600">{service.date}</TableCell>
                <TableCell className="py-6 px-8">
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-slate-600 hover:text-blue-600 transition-colors">
                      <SquarePen className="w-5 h-5" />
                    </button>
                    <button className="text-slate-600 hover:text-rose-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
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
      <AddServiceModal open={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}