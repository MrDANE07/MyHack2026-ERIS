'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { extractSignals } from '@/lib/api'
import type { Signals } from '@/lib/types'
import { AlertCircle } from 'lucide-react'

interface InteractionFormProps {
  relationshipId: string
  onSubmitSuccess: (signals: Signals, summary: string) => void
}

export function InteractionForm({
  relationshipId,
  onSubmitSuccess
}: InteractionFormProps) {
  const [summary, setSummary] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (summary.length < 10) {
      setError('Summary must be at least 10 characters')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await extractSignals(relationshipId, summary)

      if (response.success && response.signals) {
        onSubmitSuccess(response.signals, response.relationship_summary || '')
        setSummary('') // Clear form on success
      } else {
        setError(response.error || 'Failed to extract signals')
      }
    } catch (err) {
      console.error('[ERIS] Signal extraction error:', err)
      setError('Failed to process interaction')
    } finally {
      setIsSubmitting(false)
    }
  }

  const remainingChars = 10 - summary.length

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Describe your interaction with the mentor. What topics were discussed? What decisions were made? What questions remain?"
          className="min-h-32 resize-none"
          disabled={isSubmitting}
        />
        <div className="flex justify-between mt-2 text-sm">
          <p className="text-muted-foreground">
            Do not include personal names or contact details.
          </p>
          <span className={remainingChars > 0 ? 'text-chart-2' : 'text-muted-foreground'}>
            {remainingChars > 0 ? `${remainingChars} more chars needed` : `${summary.length} chars`}
          </span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || summary.length < 10}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Analyzing...
          </>
        ) : (
          'Submit Interaction'
        )}
      </Button>
    </form>
  )
}
