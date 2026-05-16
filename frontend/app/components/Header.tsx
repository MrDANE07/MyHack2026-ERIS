"use client"

import Link from 'next/link'
import { Home, Users, BarChart3, Activity, Menu, X } from 'lucide-react'
import { useState } from 'react'

function NavLink({ href, children, isActive }: { href: string, children: React.ReactNode, isActive?: boolean }) {
  return (
    <Link href={href} className={`nav-link ${isActive ? 'nav-link-active' : ''}`}>
      {children}
    </Link>
  )
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-background-secondary border-l border-border z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-gradient text-2xl">ERIS</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background-tertiary rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/matching">Matches</NavLink>
          <NavLink href="/programmes">Programmes</NavLink>
        </div>
      </nav>
    </>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 bg-background-secondary/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  <Activity className="w-6 h-6 text-black" />
                </div>
                <span className="text-gradient text-2xl font-display font-semibold">
                  ERIS
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                <NavLink href="/dashboard">
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Dashboard
                  </span>
                </NavLink>
                <NavLink href="/matching">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Matches
                  </span>
                </NavLink>
                <NavLink href="/programmes">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Programmes
                  </span>
                </NavLink>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 badge badge-success">
                  <div className="w-2 h-2 rounded-full bg-signal-clarity animate-pulse" />
                  <span className="text-xs">System Live</span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-background-tertiary rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
