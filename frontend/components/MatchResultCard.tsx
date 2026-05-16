import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { VerificationBadge } from './VerificationBadge'
import { UserCircle, Clock, ArrowRight, Zap, Sparkles, Target } from 'lucide-react'

interface MatchResultCardProps {
  mentorName: string
  compatibilityScore: number
  explanation: string
  expertise?: string[]
  availability?: string
  verified?: boolean
  onCreateRelationship: () => void
  isCreating?: boolean
}

function getScoreConfig(score: number) {
  if (score >= 80) return { 
    color: 'glow-teal', 
    dotClass: 'bio-dot-teal',
    bgClass: 'bg-primary/10 border-primary/30',
    progressClass: 'bio-progress-teal',
    label: 'Strong Match',
    icon: Zap
  }
  if (score >= 60) return { 
    color: 'glow-violet', 
    dotClass: 'bio-dot-violet',
    bgClass: 'bg-secondary/10 border-secondary/30',
    progressClass: 'bio-progress-violet',
    label: 'Good Match',
    icon: Sparkles
  }
  return { 
    color: 'glow-amber', 
    dotClass: 'bio-dot-amber',
    bgClass: 'bg-accent/10 border-accent/30',
    progressClass: 'bio-progress-amber',
    label: 'Potential Match',
    icon: Target
  }
}

export function MatchResultCard({
  mentorName,
  compatibilityScore,
  explanation,
  expertise = [],
  availability,
  verified = false,
  onCreateRelationship,
  isCreating = false
}: MatchResultCardProps) {
  const scoreConfig = getScoreConfig(compatibilityScore)
  const ScoreIcon = scoreConfig.icon

  return (
    <div className="glass-card p-6 hover-glow group">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Mentor Info */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                <UserCircle className="h-8 w-8 text-primary" />
              </div>
              <div className={`absolute -bottom-1 -right-1 bio-dot ${scoreConfig.dotClass}`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-foreground">{mentorName}</h3>
                <VerificationBadge verified={verified} />
              </div>
              
              {availability && (
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{availability}</span>
                </div>
              )}
            </div>
          </div>

          {/* Explanation */}
          <p className="text-muted-foreground leading-relaxed">{explanation}</p>

          {/* Expertise Tags */}
          {expertise.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {expertise.map(exp => (
                <Badge 
                  key={exp} 
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors"
                >
                  {exp}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Right: Score & Action */}
        <div className="flex flex-row md:flex-col items-center gap-4 md:min-w-[140px]">
          {/* Score Display */}
          <div className={`text-center p-4 rounded-xl border ${scoreConfig.bgClass} w-full`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <ScoreIcon className="h-4 w-4 text-current opacity-70" />
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Compatibility
              </span>
            </div>
            <div className={`text-4xl font-bold number-pulse ${scoreConfig.color}`}>
              {compatibilityScore}
            </div>
            <div className="text-xs font-medium text-muted-foreground mt-1">
              {scoreConfig.label}
            </div>
            
            {/* Mini Progress Bar */}
            <div className="bio-progress mt-3">
              <div 
                className={`bio-progress-fill ${scoreConfig.progressClass}`}
                style={{ width: `${compatibilityScore}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={onCreateRelationship}
            disabled={isCreating}
            className="btn-bio w-full"
          >
            <span className="flex items-center justify-center gap-2">
              {isCreating ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Creating...
                </>
              ) : (
                <>
                  Connect
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
