
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      {/* Main Container */}
      <div className="w-full max-w-[400px] space-y-8">

        {/* Header */}
        <div className="space-y-2 text-start">
          <h1 className="text-3xl font-bold text-[#003366]">Welcome</h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue your beauty journey
          </p>
        </div>

        {/* Form */}
        <form className="space-y-[16px]" onSubmit={(e) => e.preventDefault()}>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter your email"
              className="pl-10 py-6 border-gray-300 focus-visible:ring-[#003366]"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              className="pl-10 pr-10 py-6 border-gray-300 focus-visible:ring-[#003366]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-[#003366]" />
              <Label htmlFor="remember" className="text-sm text-gray-500 font-normal cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            className="w-full bg-[#003366] hover:bg-[#002244] text-white py-3 text-lg font-semibold"
          >
            Log In
          </Button>

        </form>
      </div>
    </div>
  );
}
