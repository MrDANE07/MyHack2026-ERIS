"use client"
import { Card, CardFooter } from '@/components/ui/card'

export interface MatchResultCardProps {
  mentorName: string
  mentorExpertise: string[]
  compatibilityScore: number
  explanation: string
  onCreateRelationship: () => void
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-red-400'
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-emerald-400'
  if (score >= 60) return 'bg-amber-400'
  return 'bg-red-400'
}

function getScoreBorderClass(score: number): string {
  if (score >= 80) return 'border-emerald-400/30 hover:bg-emerald-400/10 text-emerald-400 hover:text-emerald-300'
  if (score >= 60) return 'border-amber-400/30 hover:bg-amber-400/10 text-amber-400 hover:text-amber-300'
  return 'border-red-400/30 hover:bg-red-400/10 text-red-400 hover:text-red-300'
}

export default function MatchResultCard({
  mentorName,
  mentorExpertise,
  compatibilityScore,
  explanation,
  onCreateRelationship,
}: MatchResultCardProps) {
  const scoreColor = getScoreColor(compatibilityScore)
  const scoreBgColor = getScoreBgColor(compatibilityScore)
  const borderClass = getScoreBorderClass(compatibilityScore)

  return (
    <Card className="p-0 flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6">
          <h3 className="text-xl font-semibold text-white">{mentorName}</h3>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            {mentorExpertise.map((expertise, index) => (
              <span
                key={index}
                className="bg-cyan-500/10 text-cyan-400 text-xs rounded-full px-2 py-0.5"
              >
                {expertise}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed italic">{explanation}</p>
        </div>

        <div className="w-32 flex-shrink-0 flex flex-col items-center justify-center p-6 border-l border-white/5 relative">
          <div className={`absolute w-24 h-24 rounded-full blur-3xl ${scoreBgColor} opacity-15`} />
          <div className={`text-5xl font-light tracking-tighter ${scoreColor}`}>
            {compatibilityScore}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-gray-500">
            COMPATIBILITY
          </div>
        </div>
      </div>

      <CardFooter className="px-6 pb-4 pt-0 border-t border-white/5 mt-auto">
        <button
          onClick={onCreateRelationship}
          className={`w-full py-2 px-4 rounded-md border ${borderClass} transition-colors`}
        >
          Create Relationship
        </button>
      </CardFooter>
    </Card>
  )
}
