"use client"

import React, { useState } from 'react'
import DynamicPageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useDebounce } from 'use-debounce'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Meta, User, UserResponse } from '../../../../../../types/userdatatype'

const UserData = () => {
    const session = useSession()
    const token = session?.data?.user?.accessToken || ""
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

    const [page, setPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data, isLoading } = useQuery<UserResponse>({
        queryKey: ["user", page, debouncedSearchTerm],
        enabled: !!token,
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/all-user?page=${page}&limit=10&searchTerm=${debouncedSearchTerm ? debouncedSearchTerm : ""}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (!res.ok) throw new Error("Failed to fetch users")
            return res.json()
        },
    })

    if (isLoading) return <p className="p-6 text-center">Loading...</p>

    const users: User[] = data?.data || []
    const meta: Meta = data?.meta || { total: 0, page: 1, limit: 5 }
    const totalPages = Math.ceil(meta.total / meta.limit)

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="flex px-8 py-4 justify-between items-start mb-8">
                <DynamicPageHeader pageTitle="User Managements" />

                <div className="flex w-full max-w-sm items-center overflow-hidden rounded-lg border border-[#666666] focus-within:ring-1 focus-within:ring-ring">
                    <Input
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setPage(1) // Reset page when searching
                        }}
                        type="text"
                        placeholder="Search by Category Name"
                        className="border-0 bg-transparent py-6 text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
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
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-[#B6B6B6]">
                            <TableHead className="py-4 font-bold px-8 text-slate-800">User Name</TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center">Total Booking</TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center">Completed booking</TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center">Cancel Booking</TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => {
                            const totalBooking = user.totalBooking?.length || 0
                            const completedBooking = user.completeBooking?.length || 0
                            const cancelledBooking = user.cencleBooking?.length || 0

                            return (
                                <TableRow key={user._id} className="border-b border-[#B6B6B6]">
                                    <TableCell className="py-6 font-medium px-8 text-slate-700">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={user.profileImage || "https://github.com/shadcn.png"} alt={user.firstName} />
                                                <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
                                            </Avatar>
                                            {user.firstName} {user.lastName}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 text-center px-8 text-slate-600">{totalBooking}</TableCell>
                                    <TableCell className="py-6 text-center px-8 text-slate-600">{completedBooking}</TableCell>
                                    <TableCell className="py-6 text-center px-8 text-slate-600">{cancelledBooking}</TableCell>
                                    <TableCell className="py-6 px-8">
                                        <div className="flex items-center justify-center gap-4">
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setIsModalOpen(true)
                                                }}
                                                className="text-white py-1 px-2 text-[12px] rounded-md bg-[#003366] hover:bg-[#003366]/80 transition-colors"
                                            >
                                                Details
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                {/* Pagination Section */}
                <div className="flex items-center justify-between px-6 py-4 border-t bg-[#FFFFFF]">
                    <p className="text-sm text-slate-500">
                        Showing {meta.page * meta.limit - meta.limit + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-slate-400 bg-slate-50 border-slate-200"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button
                                key={p}
                                variant={p === page ? "default" : "outline"}
                                size="sm"
                                className={`h-8 w-8 ${p === page ? "bg-[#00315C] text-white" : "border-slate-200 text-slate-600"}`}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-slate-600 border-slate-200"
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal Section */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl w-full bg-white h-[600px] overflow-y-scroll rounded-lg p-6 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-slate-900 mb-2">
                            User Details
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-500">
                            Detailed information about the selected user.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedUser && (
                        <div className="mt-4 space-y-4">
                            {/* Basic Info */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={selectedUser.profileImage || "https://github.com/shadcn.png"} alt={selectedUser.firstName} />
                                    <AvatarFallback>{selectedUser.firstName?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-900">
                                        {selectedUser.firstName} {selectedUser.lastName}
                                    </h3>
                                    <p className="text-sm text-slate-500">{selectedUser.email}</p>
                                    <p className="text-sm text-slate-500">Role: {selectedUser.role}</p>
                                </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${selectedUser.verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                    {selectedUser.verified ? "Verified" : "Not Verified"}
                                </span>
                                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${selectedUser.status === "active" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}`}>
                                    {selectedUser.status}
                                </span>
                                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${selectedUser.isSubscription ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-600"}`}>
                                    {selectedUser.isSubscription ? "Subscribed" : "No Subscription"}
                                </span>
                            </div>

                            {/* Booking Info */}
                            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                                <div className="bg-gray-50 p-2 rounded-md text-center">
                                    <p className="font-medium text-slate-700">Total Bookings</p>
                                    <p className="text-slate-900">{selectedUser.totalBooking?.length || 0}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-md text-center">
                                    <p className="font-medium text-slate-700">Completed</p>
                                    <p className="text-slate-900">{selectedUser.completeBooking?.length || 0}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-md text-center">
                                    <p className="font-medium text-slate-700">Cancelled</p>
                                    <p className="text-slate-900">{selectedUser.cencleBooking?.length || 0}</p>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="mt-4">
                                <h4 className="font-medium text-slate-900 mb-2">Services</h4>
                                {selectedUser.service?.length ? (
                                    <div className="space-y-3">
                                        {selectedUser.service.map((s) => (
                                            <div key={s._id} className="border border-gray-200 rounded-md p-3 bg-gray-50">
                                                <p><strong>Category ID:</strong> {s.categoryId}</p>
                                                <p><strong>Location:</strong> {s.location}</p>
                                                <p><strong>Hour Rate:</strong> {s.hourRate ?? "N/A"}</p>
                                                <p><strong>Status:</strong> {s.status}</p>
                                                <p><strong>Days:</strong> {s.days?.day?.join(", ") || "N/A"}</p>
                                                <p><strong>Times:</strong> {s.days?.time?.join(", ") || "N/A"}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No services available.</p>
                                )}
                            </div>
                        </div>
                    )}

                    <DialogFooter className="mt-6">
                        <Button variant="default" onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UserData
