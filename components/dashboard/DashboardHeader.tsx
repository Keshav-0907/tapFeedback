'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from '@/hooks/useAuth'
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'sonner'

const DashboardHeader = () => {
  const { user, loading, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully")
  }

  return (
    <div className='bg-[#18181B] py-3 px-4 border-b flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none cursor-pointer'>
          <div className='flex items-center gap-4'>
            {loading ? (
              <>
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </>
            ) : (
              <>
                <div className='text-sm font-semibold'>Hi, {user?.name}</div>
                <Avatar>
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DashboardHeader
