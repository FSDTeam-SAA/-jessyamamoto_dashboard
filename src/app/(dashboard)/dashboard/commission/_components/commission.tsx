"use client"
import React from 'react'
import DynamicPageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const servicesData = [
    {
        id: 1,
        date: "11/7/16",
        commission: 100,
        commissionRevenue: "$100",
    },
    {
        id: 2,
        date: "12/1/16",
        commission: 150,
        commissionRevenue: "$150",
    },
    {
        id: 3,
        date: "12/5/16",
        commission: 200,
        commissionRevenue: "$200",
    },
]


const Commission = () => {
    return (
        <div className=" min-h-screen">
            {/* Header Section */}
            <div className="flex px-8 py-4 justify-between items-start mb-8">
                <DynamicPageHeader pageTitle="Commission" />

                <Button className="bg-[#00315C] hover:bg-[#00264d] text-white flex items-center gap-2 px-4 py-2 h-11">
                    <Plus className="w-5 h-5" />
                    Add Commission
                </Button>
            </div>

            {/* Table Section */}
            <div className="border-t border-[#B6B6B6] rounded-sm">
                <Table>
                    <TableHeader className="">
                        <TableRow className="hover:bg-transparent border-[#B6B6B6] ">
                            <TableHead className="py-4 font-bold px-8 text-slate-800"> Date </TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Commission </TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Commission Revenue </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {servicesData.map((service) => (
                            <TableRow key={service.id} className="hover:bg-[#F5F5F5] border-[#B6B6B6]">
                                <TableCell className="py-4 px-8">{service.date}</TableCell>
                                <TableCell className="py-4 px-8 text-center">{service.commission}</TableCell>
                                <TableCell className="py-4 px-8 text-center">{service.commissionRevenue}</TableCell>
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

export default Commission