import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

const variantStyles = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'text-foreground border border-input'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantStyles[variant]} ${className || ''}`}
      {...props}
    />
  )
}

export default Badge
