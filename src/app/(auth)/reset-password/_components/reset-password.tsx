"use client"

import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2 text-left">
          <h1 className="text-3xl font-bold text-[#003366]">Reset Password</h1>
          <p className="text-muted-foreground text-sm">
            Create a new password
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* New Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type={showPass ? "text" : "password"} 
              placeholder="Create New Password" 
              className="pl-10 pr-10 py-6 bg-white border-gray-200 focus-visible:ring-[#003366] placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type={showConfirm ? "text" : "password"} 
              placeholder="Confirm New Password" 
              className="pl-10 pr-10 py-6 bg-white border-gray-200 focus-visible:ring-[#003366] placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-[#003366] hover:bg-[#002855] text-white py-6 text-lg font-semibold mt-4 transition-colors"
          >
            Change Password
          </Button>
        </form>

      </div>
    </div>
  );
}