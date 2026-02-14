"use client"

import React, { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Image from "next/image"

// ✅ Zod schema
const schema = z.object({
    dname: z
        .string()
        .min(1, "Service title is required")
        .min(3, "Title must be at least 3 characters"),
    image: z.any().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
    open: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    editData?: {
        _id?: string
        name?: string
        image?: string
    } | null
}

export default function AddServiceModal({
    open,
    setIsOpen,
    editData,
}: Props) {
    const isEdit = !!editData?._id
    const queryClient = useQueryClient()
    const session = useSession()
    const token = session?.data?.user?.accessToken || ""

    const [preview, setPreview] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const watchedImage = watch("image")

    // ✅ Prefill when editing
    useEffect(() => {
        if (editData?.name) {
            setValue("dname", editData.name)
            setPreview(editData.image || null)
        } else {
            reset()
            setPreview(null)
        }
    }, [editData, setValue, reset])

    // ✅ Preview when new file selected
    useEffect(() => {
        const file = watchedImage?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [watchedImage])

    // ✅ Add mutation
    const addMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const fd = new FormData()
            fd.append("name", formData.dname)

            const file = formData.image?.[0]
            if (file) fd.append("image", file)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: fd,
                }
            )

            if (!res.ok) throw new Error("Create failed")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service'] })
            setIsOpen(false)
            reset()
            setPreview(null)
        },
    })

    // ✅ Edit mutation
    const editMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const fd = new FormData()
            fd.append("dname", formData.dname)

            const file = formData.image?.[0]
            if (file) fd.append("image", file)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/category/${editData?._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: fd,
                }
            )

            if (!res.ok) throw new Error("Update failed")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service'] })
            setIsOpen(false)
            reset()
            setPreview(null)
        },
    })

    const onSubmit = (data: FormData) => {
        if (isEdit) {
            editMutation.mutate(data)
        } else {
            addMutation.mutate(data)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[525px] p-8 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                        {/* Service Title Field */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="service-title"
                                className="text-lg text-slate-800"
                            >
                                Service Title
                            </Label>
                            <Input
                                id="service-title"
                                placeholder="Type Title here. . ."
                                className="h-12 border-slate-200 placeholder:text-slate-300 rounded-lg focus-visible:ring-[#00315C]"
                                {...register("dname")}
                            />
                            {errors.dname && (
                                <p className="text-sm text-red-500">
                                    {errors.dname.message}
                                </p>
                            )}
                        </div>

                        {/* Image Upload Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="image" className="text-lg text-slate-800">
                                Service Image
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="h-12 border-slate-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#00315C] file:text-white file:rounded-md"
                                {...register("image")}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">
                                    {errors.image.message as string}
                                </p>
                            )}

                            {/* ✅ Image Preview */}
                            {preview && (
                                <div className="mt-3 flex justify-center">
                                    <Image
                                        width={200}
                                        height={200}
                                        src={preview}
                                        alt="preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-center mt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting || addMutation.isPending || editMutation.isPending}
                                className="bg-[#00315C] hover:bg-[#00264d] text-white px-10 py-6 text-lg font-medium rounded-lg"
                            >
                                {isEdit ? "Update" : "Save"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
