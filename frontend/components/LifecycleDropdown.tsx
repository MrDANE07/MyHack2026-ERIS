"use client"

import * as React from 'react'
import { Badge } from './ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { updateLifecycle } from '@/lib/api'

export interface LifecycleDropdownProps {
  currentStatus: 'Created' | 'Active' | 'Completed' | 'Failed'
  relationshipId: string
  onStatusChange: (newStatus: string) => void
}

const validTransitions: Record<string, Array<{ value: string; label: string }>> = {
  Created: [{ value: 'Active', label: 'Set Active' }],
  Active: [
    { value: 'Completed', label: 'Mark Completed' },
    { value: 'Failed', label: 'Mark Failed' },
  ],
  Completed: [],
  Failed: [],
}

const statusColors: Record<string, string> = {
  Created: 'text-cyan-400',
  Active: 'text-emerald-400',
  Completed: 'text-zinc-500',
  Failed: 'text-red-400',
}

const statusBgColors: Record<string, string> = {
  Created: 'bg-cyan-400',
  Active: 'bg-emerald-400',
  Completed: 'bg-zinc-500',
  Failed: 'bg-red-400',
}

export default function LifecycleDropdown({
  currentStatus,
  relationshipId,
  onStatusChange,
}: LifecycleDropdownProps) {
  const isTerminal = currentStatus === 'Completed' || currentStatus === 'Failed'

  if (isTerminal) {
    return (
      <Badge className={`${statusColors[currentStatus]} text-xs`}>
        {currentStatus}
      </Badge>
    )
  }

  const transitions = validTransitions[currentStatus] || []

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateLifecycle({
        relationship_id: relationshipId,
        new_status: newStatus,
      })
      onStatusChange(newStatus)
    } catch (error) {
      console.error('Failed to update lifecycle status:', error)
    }
  }

  return (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger className="h-auto py-1.5 px-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${statusBgColors[currentStatus]}`}
          />
          <span className={statusColors[currentStatus]}>{currentStatus}</span>
        </div>
        <SelectValue placeholder={currentStatus} className="sr-only" />
      </SelectTrigger>
      <SelectContent>
        {transitions.map((transition) => (
          <SelectItem key={transition.value} value={transition.value}>
            {transition.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
