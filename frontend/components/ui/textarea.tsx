import * as React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-white/8 bg-[#0E0E16] px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a] disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
      {...props}
    />
  )
}

export default Textarea
