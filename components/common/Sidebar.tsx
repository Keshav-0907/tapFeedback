import { url } from 'inspector'
import { Cog, FolderOpenDot, House, Info, PlusCircle, Settings, ShieldCheck, TextQuote } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const sideBarItems = [
  {
    name: 'All Projects',
    icon: <FolderOpenDot size={16} />,
    url: '/dashboard/project',
  },
  {
    name: 'Settings',
    icon: <Cog size={16} />,
    url: '/dashboard/settings',
  },
  {
    name: 'Upgrade',
    icon: <ShieldCheck size={16} />,
    url: '/dashboard/upgrade',
  },
]

const mockProjects = [
  {
    name: 'Project 1',
    icon: <House size={16} />,
    url: '/dashboard/project/1',
  },
]

const Sidebar = () => {
  const currentUrl = usePathname()

  return (
    <div className='my-4 ml-4 mr-2 w-52 flex flex-col justify-between bg-white shadow-md rounded-lg border-[1px]'>
      <div className='flex flex-col gap-2 justify-center px-4'>
        <div className='p-4'>
          Logo Area
        </div>

        <div className='bg-[#FAFAFA] border-[1px] font-medium hover:border-[#bebebe] cursor-pointer hover:shadow-sm border-[#E1E1E1] py-2 rounded-md text-center flex text-sm gap-2 items-center justify-center'>
          <PlusCircle size={14}/>
          Create New Project
        </div>

        <div className='flex flex-col gap-2 pt-6'>
          <div className='text-sm text-[#979797]'> General </div>
          <div className='flex flex-col gap-2 text-sm '>
            {
              sideBarItems.map((item) => (
                <Link key={item.name} href={item.url} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer border-[1px] ${item.url === currentUrl ? 'bg-[#F5F5F5] border-[#E4E4E7] text-[#000000] border-[1px] font-medium' : 'hover:bg-[#FAFAFA] border-white'}`}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))
            }
          </div>
        </div>

      </div>
      <div className='px-4 py-2 flex flex-col gap-2 border-t'>
        <div className='text-sm flex gap-2 items-center cursor-pointer hover:bg-[#F5F5F5] p-1 rounded-sm'>
          <Info size={14}/> Get Help
        </div>

        <div className='text-sm flex gap-2 items-center cursor-pointer hover:bg-[#F5F5F5] p-1 rounded-sm'>
          <Settings size={14}/> Settings
        </div>
      </div>
    </div>
  )
}

export default Sidebar


