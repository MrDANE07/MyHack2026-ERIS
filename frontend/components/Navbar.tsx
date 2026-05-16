'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Building2, Network } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/matching', label: 'Matching', icon: Users },
  { href: '/programmes', label: 'Programmes', icon: Building2 },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="frosted-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <Network className="h-8 w-8 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsla(166,100%,50%,0.8)]" />
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider glow-teal">ERIS</span>
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase hidden sm:block">
                Ecosystem Intelligence
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                    transition-all duration-300 bracket-corners
                    ${isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_hsla(166,100%,50%,0.6)]' : ''}`} />
                  <span className="hidden md:inline">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <span className="bio-dot bio-dot-teal" />
              <span className="font-mono text-xs text-muted-foreground tracking-wider">
                <span className="text-primary">SYS</span>:<span className="text-secondary">MYHACK.2026</span>
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
