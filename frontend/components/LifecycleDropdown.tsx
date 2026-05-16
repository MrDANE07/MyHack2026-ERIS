'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { updateLifecycle } from '@/lib/api'
import type { Relationship } from '@/lib/types'
import { toast } from 'sonner'
import { AlertCircle } from 'lucide-react'

interface LifecycleDropdownProps {
  currentStatus: Relationship['status']
  relationshipId: string
  onStatusChange: (newStatus: string) => void
}

const statusTransitions: Record<Relationship['status'], Relationship['status'][]> = {
  'Created': ['Active'],
  'Active': ['Completed', 'Failed'],
  'Completed': [],
  'Failed': []
}

const statusLabels: Record<Relationship['status'], { label: string; action: string }> = {
  'Created': { label: 'Created', action: 'Just created' },
  'Active': { label: 'Active', action: 'Set Active' },
  'Completed': { label: 'Completed', action: 'Mark Completed' },
  'Failed': { label: 'Failed', action: 'Mark Failed' }
}

export function LifecycleDropdown({
  currentStatus,
  relationshipId,
  onStatusChange
}: LifecycleDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const availableTransitions = statusTransitions[currentStatus]
  const isTerminal = availableTransitions.length === 0

  const handleChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return

    setIsUpdating(true)
    setError(null)

    try {
      const response = await updateLifecycle(relationshipId, newStatus)

      if (response.success && response.updated_status) {
        onStatusChange(response.updated_status)
        toast.success(`Status updated to ${response.updated_status}`)
      } else {
        setError(response.error || 'Failed to update status')
      }
    } catch (err) {
      console.error('[ERIS] Update lifecycle error:', err)
      setError('Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  if (isTerminal) {
    return (
      <div className="space-y-2">
        <div className="p-3 rounded-md bg-muted text-center">
          <span className="font-medium">{statusLabels[currentStatus].label}</span>
          <p className="text-sm text-muted-foreground mt-1">
            This is a terminal state and cannot be changed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Select
        value={currentStatus}
        onValueChange={handleChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {isUpdating ? 'Updating...' : statusLabels[currentStatus].label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={currentStatus} disabled>
            {statusLabels[currentStatus].label} (Current)
          </SelectItem>
          {availableTransitions.map(status => (
            <SelectItem key={status} value={status}>
              {statusLabels[status].action}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <p className="text-xs text-muted-foreground">
        Available actions: {availableTransitions.map(s => statusLabels[s].action).join(', ') || 'None'}
      </p>
    </div>
  )
}
