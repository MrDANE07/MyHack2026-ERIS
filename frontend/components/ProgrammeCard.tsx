import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Programme } from '@/lib/types'
import { MapPin, Users, Building2, Zap, Clock, CheckCircle } from 'lucide-react'

interface ProgrammeCardProps extends Programme {}

function getStatusConfig(status: Programme['status']): { 
  styles: string
  icon: React.ReactNode
  glowClass: string
  dotClass: string
} {
  switch (status) {
    case 'Active': 
      return { 
        styles: 'bg-primary/10 text-primary border-primary/30',
        icon: <Zap className="h-3 w-3" />,
        glowClass: 'shadow-[0_0_15px_rgba(0,255,209,0.4)]',
        dotClass: 'bio-dot-teal'
      }
    case 'Completed': 
      return { 
        styles: 'bg-muted text-muted-foreground border-border',
        icon: <CheckCircle className="h-3 w-3" />,
        glowClass: '',
        dotClass: ''
      }
    case 'Upcoming': 
      return { 
        styles: 'bg-secondary/10 text-secondary border-secondary/30',
        icon: <Clock className="h-3 w-3" />,
        glowClass: 'shadow-[0_0_15px_rgba(191,95,255,0.4)]',
        dotClass: 'bio-dot-violet'
      }
    default: 
      return { 
        styles: 'bg-muted text-muted-foreground border-border',
        icon: null,
        glowClass: '',
        dotClass: ''
      }
  }
}

export function ProgrammeCard({
  id,
  name,
  country,
  focus_areas,
  status,
  cohort_size
}: ProgrammeCardProps) {
  const statusConfig = getStatusConfig(status)
  
  return (
    <div className="glass-card p-6 h-full group hover:border-primary/50 transition-all duration-300 hover-glow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Icon with glow effect */}
          <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 shrink-0 group-hover:shadow-[0_0_25px_rgba(0,255,209,0.4)] transition-all duration-300">
            <Building2 className="h-5 w-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          </div>
          
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="data-id">ID: {id.slice(0, 8).toUpperCase()}</span>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-mono">
                <MapPin className="h-3.5 w-3.5 text-primary/70" />
                {country}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-secondary/70" />
                <span className="font-mono">{cohort_size}</span> startups
              </span>
            </div>
          </div>
        </div>
        
        {/* Status Badge with bio-dot */}
        <div className="flex items-center gap-2">
          {statusConfig.dotClass && <span className={`bio-dot ${statusConfig.dotClass}`} />}
          <Badge className={cn(
            'border shrink-0 flex items-center gap-1.5 transition-all font-mono text-xs uppercase tracking-wider',
            statusConfig.styles,
            statusConfig.glowClass
          )}>
            {statusConfig.icon}
            {status}
          </Badge>
        </div>
      </div>
      
      {/* Focus Areas */}
      <div className="pt-4 border-t border-border/30">
        <span className="data-label mb-3 block">Focus Areas</span>
        <div className="flex flex-wrap gap-2">
          {focus_areas.map((area, index) => (
            <Badge 
              key={area} 
              variant="secondary"
              className={cn(
                "bg-background/30 border transition-all duration-300 font-mono text-xs",
                index % 3 === 0 && "border-primary/30 text-primary/90 hover:bg-primary/15 hover:border-primary/50",
                index % 3 === 1 && "border-secondary/30 text-secondary/90 hover:bg-secondary/15 hover:border-secondary/50",
                index % 3 === 2 && "border-accent/30 text-accent/90 hover:bg-accent/15 hover:border-accent/50"
              )}
            >
              {area}
            </Badge>
          ))}
        </div>
      </div>

      {/* Bottom progress indicator */}
      <div className="mt-4 bio-progress bio-progress-teal">
        <div 
          className="bio-progress-fill" 
          style={{ width: status === 'Active' ? '75%' : status === 'Upcoming' ? '25%' : '100%' }} 
        />
      </div>
    </div>
  )
}
