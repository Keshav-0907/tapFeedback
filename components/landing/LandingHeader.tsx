'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import AuthModal from '../common/AuthModal';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import Avtar from '@/public/Avtar.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface LandingHeaderProps {
  setShowAuthModal: (show: boolean) => void;
}

const LandingHeader = ({ setShowAuthModal }: LandingHeaderProps) => {
  const { user, loading, logout } = useAuth()

  return (
    <div className='fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/70 px-40 py-4 flex justify-between items-center border-b border-gray-200'>
      <div className='text-xl font-bold text-gray-800'>
        SitePop
      </div>

      <div className='flex items-center gap-10 text-sm'>
        <div className='flex items-center gap-8 font-semibold'>
          <div className='cursor-pointer'> Features </div>
          <div className='cursor-pointer'>  Pricing </div>
        </div>
        <div>
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className='outline-none cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <Image src={Avtar} alt='avatar' width={40} height={40} className='rounded-full cursor-pointer' />
                    <div className='flex iterms flex-col'>
                      <div className='text-sm font-semibold text-start'> {user.name} </div>
                      <div className='text-xs'> {user.email} </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Your Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                  <DropdownMenuItem disabled>Billing</DropdownMenuItem>
                  <DropdownMenuItem disabled>Team</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className='text-red-500'>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              <Button variant='outline' className='text-sm font-semibold' onClick={() => setShowAuthModal(true)}> Sign In </Button>
            )
          }
        </div>


      </div>

    </div>
  )
}

export default LandingHeader



