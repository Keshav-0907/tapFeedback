'use client'

import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function ColorPicker({
    value,
    onChange,
}: {
    value: string
    onChange: (color: string) => void
}) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className='flex gap-1 items-center'>
                    <Input 
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className=""
                        placeholder="Enter color code"
                    />
                    <Button
                        variant="outline"
                        className={cn('w-10 h-10 p-0 rounded-md border')}
                        style={{ backgroundColor: value }}
                    />
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-[220px] space-y-2">
                <HexColorPicker color={value} onChange={onChange} />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full"
                />
            </PopoverContent>
        </Popover>
    )
}
