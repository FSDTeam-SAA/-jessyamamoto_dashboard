"use client"

import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] flex items-center justify-center p-6">
      <div className="w-full max-w-[450px] space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#003366] tracking-tight">
            Forgot Password
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email to recover your password
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            {/* Mail Icon positioned inside the input */}
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="pl-10 py-6 bg-white border-gray-200 focus-visible:ring-[#003366] text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-[#003366] hover:bg-[#002855] text-white py-6 text-base font-semibold transition-colors"
          >
            Send OTP
          </Button>
        </form>

      </div>
    </div>
  );
}