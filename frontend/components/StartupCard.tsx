"use client"
import { Sparkles } from 'lucide-react'
import { VerificationBadge } from './VerificationBadge'

export interface StartupCardProps {
  id: string
  name: string
  domain: string[]
  stage: number
  needs: string[]
  goals: string[]
  verified: boolean
  onGenerateMatches: (id: string) => void
}

const STAGE_LABELS = [
  'Idea',
  'MVP',
  'Pre-Seed',
  'Seed',
  'Series A',
  'Growth',
]

export default function StartupCard({
  id,
  name,
  domain,
  stage,
  needs,
  goals,
  verified,
  onGenerateMatches,
}: StartupCardProps) {
  return (
    <div className="relative bg-[#0a0f1a]/90 backdrop-blur-sm rounded-xl border border-[#fbbf24]/20 overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#fbbf24]/0 via-[#fbbf24] to-[#fbbf24]/0" />

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <VerificationBadge verified={verified} />
        </div>

        <span className="text-xs text-gray-500 font-medium">
          {STAGE_LABELS[stage] || 'Unknown Stage'}
        </span>

        {domain.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {domain.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] text-xs font-medium"
              >
                {d}
              </span>
            ))}
          </div>
        )}

        {(needs.length > 0 || goals.length > 0) && (
          <div className="grid grid-cols-2 gap-4">
            {needs.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Needs
                </span>
                <ul className="space-y-1">
                  {needs.slice(0, 3).map((need) => (
                    <li
                      key={need}
                      className="text-xs text-gray-300 truncate"
                    >
                      {need}
                    </li>
                  ))}
                  {needs.length > 3 && (
                    <li className="text-xs text-gray-500">
                      +{needs.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            )}

            {goals.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Goals
                </span>
                <ul className="space-y-1">
                  {goals.slice(0, 3).map((goal) => (
                    <li
                      key={goal}
                      className="text-xs text-gray-300 truncate"
                    >
                      {goal}
                    </li>
                  ))}
                  {goals.length > 3 && (
                    <li className="text-xs text-gray-500">
                      +{goals.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={() => onGenerateMatches(id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-cyan-500/50 transition-all duration-300"
        >
          <Sparkles className="w-4 h-4" />
          Generate Matches
        </button>
      </div>
    </div>
  )
}
