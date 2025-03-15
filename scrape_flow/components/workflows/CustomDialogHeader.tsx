"use client"
import React from 'react'
import { DialogHeader, DialogTitle } from '../ui/dialog'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SelectSeparator } from '../ui/select'

interface Props {
  title?: string
  subtitle?: string
  icon?: LucideIcon

  iconClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

const CustomDialogHeader = (props:Props) => {
  const Icon = props.icon
  return (
    <DialogHeader className='py-6'>
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && (
            <Icon className={cn(props.iconClassName, 'h-8 w-8 stroke-primary')} />
          )}
          <div className={cn(props.titleClassName, 'text-2xl font-bold text-primary')}>
            {props.title}
          </div>
          {props.subtitle && (
            <div className={cn(props.subtitleClassName, 'text-sm text-muted-foreground')}>
              {props.subtitle}
            </div>
          )}
        </div>
      </DialogTitle>
      <SelectSeparator />
    </DialogHeader>
  )
}

export default CustomDialogHeader