"use client"

import React from "react"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function AddServiceModal({ open, setIsOpen }: { open: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[525px] p-8 rounded-2xl">
                <div className="grid gap-6">
                    {/* Service Title Field */}
                    <div className="grid gap-2">
                        <Label
                            htmlFor="service-title"
                            className="text-lg  text-slate-800"
                        >
                            Service Title
                        </Label>
                        <Input
                            id="service-title"
                            placeholder="Type Title here. . ."
                            className="h-12 border-slate-200 placeholder:text-slate-300 rounded-lg focus-visible:ring-[#00315C]"
                        />
                    </div>

                    {/* Service Category Field */}
                    <div className="grid gap-2">
                        <Label
                            htmlFor="category"
                            className="text-lg  text-slate-800"
                        >
                            Service Category Name
                        </Label>
                        <Select>
                            <SelectTrigger className="h-12 border-slate-200 text-slate-400 rounded-lg focus:ring-[#00315C]">
                                <SelectValue placeholder="Type Title here. . ." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="caregiving">Caregiving</SelectItem>
                                <SelectItem value="cleaning">Cleaning</SelectItem>
                                <SelectItem value="tutoring">Tutoring</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center mt-2">
                        <Button
                            className="bg-[#00315C] hover:bg-[#00264d] text-white px-10 py-6 text-lg font-medium rounded-lg"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
