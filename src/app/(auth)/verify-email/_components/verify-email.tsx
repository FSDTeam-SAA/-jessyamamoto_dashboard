"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { InputOTP } from "@/components/ui/input-otp";

export default function VerifyEmail() {
    return (
        <div className="min-h-screen w-full  flex items-center justify-center p-6">
            <div className="w-full max-w-[400px] space-y-8">

                {/* Header Section */}
                <div className="space-y-2 text-left">
                    <h1 className="text-3xl font-bold text-[#003366]">Verify Email</h1>
                    <p className="text-gray-500 text-sm">
                        Enter the 6-digit OTP sent to your email
                    </p>
                </div>

                {/* OTP Input Section */}
                <div className="space-y-6">
                    <div className="flex justify-center">
                        <InputOTP maxLength={6} render={({ slots }) => (
                            <div className="flex gap-4">
                                {slots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="w-12 h-12 border-2 border-[#003366] rounded-md flex items-center justify-center bg-white"
                                    >
                                        <div className="text-xl font-semibold text-[#003366]">
                                            {slot.char}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )} />
                    </div>

                    {/* Resend Link */}
                    <div className="flex justify-end w-full">
                        <p className="text-sm text-gray-400">
                            Don&apos;t get a code?{" "}
                            <Link href="#" className="text-[#003366] font-bold hover:underline">
                                Resend
                            </Link>
                        </p>
                    </div>

                    {/* Verify Button */}
                    <Button
                        className="w-full bg-[#003366] hover:bg-[#002855] text-white py-3 text-lg font-semibold"
                    >
                        Verify
                    </Button>
                </div>

            </div>
        </div>
    );
}
