"use client";

import React, { useState } from "react";
import { Save, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PersonalInfoForm {
  fullName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  address: string;
  profileImage: string;
}

const PersonalInformation = () => {
  const [formData, setFormData] = useState<PersonalInfoForm>({
    fullName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phoneNumber: "+880 1234 567890",
    dateOfBirth: "1998-06-15",
    address: "Dhaka, Bangladesh",
    profileImage: "/placeholder.svg",
  });

  const [originalData] = useState(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data 👉", formData);
  };

  const handleCancel = () => {
    console.log("Cancelled. Previous Data 👉", originalData);
    setFormData(originalData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        profileImage: reader.result as string,
      }));
      console.log("Selected Image 👉", file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Setting</h1>
        <div className="flex gap-2 mt-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <span>{">"}</span>
          <span>Setting</span>
          <span>{">"}</span>
          <span>Personal Information</span>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.profileImage} />
              <AvatarFallback>
                {formData.fullName
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-lg font-semibold">
                {formData.fullName} {formData.lastName}
              </h2>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>
          </div>

          <div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              onClick={() =>
                document.getElementById("profileImage")?.click()
              }
              className="bg-[#003366]/80 text-white hover:bg-[#003366] transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>Full Name</Label>
              <Input
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>Phone Number</Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={formData.email} disabled />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="text-red-600 border-red-300"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>

          <Button type="submit" className="bg-[#003366] text-white">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
