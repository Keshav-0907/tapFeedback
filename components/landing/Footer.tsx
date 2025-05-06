import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='py-5 border-t w-full max-w-6xl'>
        <div className='text-sm'> Made by <Link href={'/'} className='font-semibold'> Keshav Malik</Link> </div>
    </div>
  )
}

export default Footer