import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import React from 'react'

const Settings = () => {
  return (
    <div className="px-6 py-8 space-y-8 ">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your widget preferences, update branding, and configure behavior to match your website and goals.
        </p>
      </div>

      <div className="space-y-6 ">
        <div className='flex items-center justify-between'>
          <h3 className="text-lg font-semibold">Personal Data</h3>

          <Button>
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <p className="text-xs text-muted-foreground mb-1">Your username is used to identify you on the platform.</p>
            <Input placeholder="Enter your username" />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-xs text-muted-foreground mb-1">Used for verification and notifications.</p>
            <Input placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <p className="text-xs text-muted-foreground mb-1">Use a strong password to secure your account.</p>
            <Input type="password" placeholder="••••••••" />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <p className="text-xs text-muted-foreground mb-1">Re-enter your password to confirm.</p>
            <Input type="password" placeholder="••••••••" />
          </div>
        </div>
      </div>

      {/* Dangerous Zone */}
      <div className="p-5 border border-red-500 bg-red-50 rounded-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-red-700">Dangerous Zone</h3>
        </div>

        <Separator className="bg-red-400" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-700">Delete Your Account</p>
            <p className="text-xs text-red-600">
              This action is irreversible. All your data will be permanently deleted.
            </p>
          </div>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
            <Trash className="mr-2 w-4 h-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
