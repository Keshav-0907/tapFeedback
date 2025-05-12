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
import Avtar from '@/public/Avtar.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DashboardHeader = () => {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully")
  }

  const handleSettingsNavigation = () => {
    router.push('/dashboard/settings')
  }

  return (
    <div className='py-3 px-4 border-b flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none cursor-pointer'>
          <div className='flex items-center gap-4'>
            {loading ? (
              <>
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className='outline-none cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <Image src={Avtar} alt='avatar' width={32} height={32} className='rounded-full cursor-pointer' />
                    <div className='flex iterms flex-col'>
                      <div className='text-sm font-semibold text-start'> {user?.name} </div>
                      <div className='text-xs'> {user?.email} </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Your Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer' onClick={handleSettingsNavigation}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className='text-red-500'>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
