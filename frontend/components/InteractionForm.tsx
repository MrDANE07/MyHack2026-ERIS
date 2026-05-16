"use client"

import { useState } from 'react'
import { Zap, Loader2, Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { extractSignals } from '@/lib/api'

export interface InteractionFormProps {
  relationshipId: string
  onSubmitSuccess: (signals: { clarity: number; uncertainty: number; engagement: number }, summary: string) => void
}

export default function InteractionForm({ relationshipId, onSubmitSuccess }: InteractionFormProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await extractSignals({
        relationship_id: relationshipId,
        summary: text
      })

      onSubmitSuccess(result.signals, result.relationship_summary)
      setText('')
    } catch (err) {
      setError('Failed to extract signals. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="flex flex-col gap-4 p-6">
      <label className="text-sm font-medium">Log Interaction</label>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe the interaction..."
        rows={3}
        className="bg-[#0E0E16] border-white/[0.08] min-h-[80px]"
      />

      <div className="flex flex-row justify-between items-center">
        <span className={`text-xs ${text.length >= 10 ? 'text-cyan-400' : 'text-muted'}`}>
          {text.length} / 10 min
        </span>

        <div className="flex items-center gap-1">
          <Shield size={12} className="text-muted/40" />
          <span className="text-xs text-muted/40">No personal names please.</span>
        </div>
      </div>

      <Button
        disabled={text.length < 10 || loading}
        loading={loading}
        onClick={handleSubmit}
      >
        {!loading && <Zap className="mr-2 h-4 w-4" />}
        {loading ? 'Analyzing...' : 'Extract Signals'}
      </Button>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </Card>
  )
}
