import { Separator } from '../ui/separator'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import useAuth from '@/hooks/useAuth'
import axios from 'axios'
import { toast } from 'sonner'

interface SettingsProps {
  projectId: string
}

const Settings = ({ projectId }: SettingsProps) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleDeleteProject = async () => {
    setLoading(true)
    const res = await axios.delete('/api/project/delete-project', {
      data: {
        projectId: projectId,
        userId: user?.id,
      }
    })

    if (res.status === 200) {
      toast.success('Project deleted successfully')
      setLoading(false)
      setTimeout(() => {
        window.location.href = '/dashboard/project'
      }, 500)
    } else {
      toast.error('Error deleting project')
      setLoading(false)
    }
  }

  return (
    <div className='px-8 py-4 space-y-8'>
      <div className="p-5 border border-red-500 bg-red-50 rounded-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-red-700">Dangerous Zone</h3>
        </div>

        <Separator className="bg-red-400" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-700">Delete Project</p>
            <p className="text-xs text-red-600">
              This action is irreversible.
            </p>
          </div>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleDeleteProject}>
            {loading ? <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" /> : <Trash className="mr-2 w-4 h-4" />}
            Delete Project
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings