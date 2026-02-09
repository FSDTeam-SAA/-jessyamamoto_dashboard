"use client";

import React, { useState } from "react";
import { Save, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

const UpdatePassword = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordForm) => {
    console.log("Change Password Payload 👉", data);
  };

  const togglePasswordVisibility = (
    field: "current" | "new" | "confirm"
  ) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="  min-h-screen">
      {/* Header */}
      <div className="mb-6 p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          Dashboard &gt; Setting &gt; Change Password
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#E6EBF0]  border-t border-b border-[#003366] p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label>Current Password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  {...register("currentPassword")}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                console.log("Password form reset");
              }}
              className="border-red-300 text-red-600"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>

            <Button type="submit" className="bg-[#003366] text-white">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
