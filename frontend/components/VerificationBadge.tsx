import { Shield, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerificationBadgeProps {
  verified: boolean
  showLabel?: boolean
}

export function VerificationBadge({ verified, showLabel = false }: VerificationBadgeProps) {
  if (verified) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-mono uppercase tracking-wider',
          'border-primary/50 text-primary bg-primary/10',
          'shadow-[0_0_10px_hsla(156,100%,43%,0.3)]'
        )}
      >
        <Shield className="h-3 w-3" />
        {showLabel && <span>Verified</span>}
        {!showLabel && <span className="sr-only">Verified</span>}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-mono uppercase tracking-wider',
        'border-muted-foreground/30 text-muted-foreground bg-muted/20'
      )}
    >
      <ShieldAlert className="h-3 w-3" />
      {showLabel && <span>Unverified</span>}
      {!showLabel && <span className="sr-only">Unverified</span>}
    </div>
  )
}
