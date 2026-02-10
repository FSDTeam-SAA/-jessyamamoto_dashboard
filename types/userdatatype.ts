// types.ts
export interface Days {
    day: string[]
    time: string[]
}

export interface Service {
    _id: string
    userId: string
    categoryId: string
    location: string
    email: string
    firstName: string
    lastName: string
    gender: string
    hourRate?: number
    status: string
    days: Days
    createdAt: string
    updatedAt: string
    __v: number
}

export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    verified: boolean
    isSubscription: boolean
    category: string[]
    service: Service[]
    zip?: number
    status: string
    createdAt: string
    updatedAt: string
    subscription?: string
    subscriptionExpiry?: string
    profileImage?: string
    bio?: string
    phone?: string
    gender?: string
    totalBooking?: string[]
    completeBooking?: string[]
    cencleBooking?: string[]
}

export interface Meta {
    total: number
    page: number
    limit: number
}

export interface UserResponse {
    statusCode: number
    success: boolean
    message: string
    meta: Meta
    data: User[]
}
