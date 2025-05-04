'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import AuthModal from '../common/AuthModal';

const LandingHeader = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);


  return (
    <div className='px-40 py-4 flex justify-between items-center bg-white'>
      <div className='text-xl font-bold text-gray-800'>
        SitePop
      </div>

      <div className='flex items-center gap-10 text-sm'>
        <div className='flex items-center gap-8 font-semibold'>
          <div className='cursor-pointer'> Features </div>
          <div className='cursor-pointer'>  Pricing </div>
        </div>
        <Button className='cursor-pointer text-white  bg-primary/95' onClick={() => setShowAuthModal(true)}>
          Get Started ⚡
        </Button>
      </div>

      {
        showAuthModal && (
          <AuthModal setShowAuthModal={setShowAuthModal} />
        )
      }
    </div>
  )
}

export default LandingHeader