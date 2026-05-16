import * as React from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
}

const variantStyles = {
  default: 'bg-[#fbbf24] text-[#0a0f1a] hover:bg-[#fbbf24]/90',
  outline: 'border border-white/10 bg-transparent hover:bg-white/5 text-foreground',
  ghost: 'hover:bg-white/5 text-foreground',
  destructive: 'bg-red-600 text-white hover:bg-red-700'
}

const sizeStyles = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-12 rounded-md px-8',
  icon: 'h-10 w-10'
}

export function Button({ className, variant = 'default', size = 'default', loading, children, disabled, ...props }: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a] disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}

export default Button
