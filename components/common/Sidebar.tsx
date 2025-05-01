import { url } from 'inspector'
import { Cog, FolderOpenDot, House, ShieldCheck, TextQuote } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const sideBarItems = [
  {
    name: 'Overview',
    icon: <House size={16} />,
    url: '/dashboard',
  },
  {
    name: 'All Projects',
    icon: <FolderOpenDot size={16} />,
    url: '/dashboard/project',
  },
  {
    name: 'Responses',
    icon: <TextQuote size={16} />,
    url: '/dashboard/responses',
  },
  {
    name: 'Settings',
    icon: <Cog size={16} />,
    url: '/dashboard/settings',
  },
  {
    name: 'Update',
    icon: <ShieldCheck size={16} />,
    url: '/dashboard/update',
  },
]

const Sidebar = () => {
  return (
    <div className='border-r w-52 bg-[#18181B] flex flex-col justify-between'>
      <div className='flex flex-col gap-2'>
        <div className='p-4 border-b'>
          Logo Area
        </div>

        <div className='px-2 flex flex-col gap-2 pt-6'>
          <div className='text-xs text-[#B2B2B3]'> Platform </div>
          <div className='flex flex-col gap-2 text-sm font-semibold'>
            {
              sideBarItems.map((item) => (
                <Link key={item.name} href={item.url} className='flex items-center gap-2 hover:bg-[#27272A] p-2 rounded-md cursor-pointer'>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))
            }
          </div>
        </div>

      </div>
      <div>
        Bottom
      </div>
    </div>
  )
}

export default Sidebar