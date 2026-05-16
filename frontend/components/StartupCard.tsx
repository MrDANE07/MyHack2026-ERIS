import { Badge } from '@/components/ui/badge'
import { VerificationBadge } from './VerificationBadge'
import { Rocket, Target, Crosshair } from 'lucide-react'

interface StartupCardProps {
  id: string
  name: string
  domain: string[]
  stage: number
  needs: string[]
  goals: string[]
  verified: boolean
}

const stageLabels: Record<number, string> = {
  1: 'Pre-seed',
  2: 'Seed',
  3: 'Series A',
  4: 'Series B+',
}

export function StartupCard({
  name,
  domain,
  stage,
  needs,
  goals,
  verified
}: StartupCardProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-foreground tracking-wide">{name}</h3>
            <VerificationBadge verified={verified} />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="bio-progress bio-progress-teal flex-1 max-w-[120px]">
              <div 
                className="bio-progress-fill" 
                style={{ width: `${(stage / 4) * 100}%` }}
              />
            </div>
            <span className="data-label">
              Stage {stage}: {stageLabels[stage] || 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      {/* Domains */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="h-4 w-4 text-primary" />
          <span className="data-label">Industry Focus</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {domain.map(d => (
            <Badge 
              key={d} 
              variant="secondary" 
              className="font-mono text-xs bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
            >
              {d}
            </Badge>
          ))}
        </div>
      </div>

      {/* Needs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-4 w-4 text-secondary" />
          <span className="data-label">Current Needs</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {needs.map(need => (
            <Badge 
              key={need} 
              variant="outline" 
              className="font-mono text-xs border-secondary/40 text-secondary bg-secondary/5 hover:bg-secondary/10"
            >
              {need}
            </Badge>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Crosshair className="h-4 w-4 text-accent" />
          <span className="data-label">Goals</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {goals.map(goal => (
            <Badge 
              key={goal} 
              variant="outline" 
              className="font-mono text-xs border-accent/40 text-accent bg-accent/5 hover:bg-accent/10"
            >
              {goal}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
