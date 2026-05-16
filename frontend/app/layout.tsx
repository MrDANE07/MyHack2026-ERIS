'use client'

import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Header from './components/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ERIS - - Ecosystem Relationship Intelligence System',
  description: 'AI-powered mentor matching and relationship intelligence for innovation ecosystems',
  keywords: ['mentor matching', 'relationship intelligence', 'startup ecosystem', 'AI'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
    <html lang="en" className={inter.variable}>
      <body className={`${playfair.variable} ${jetbrains.variable}`}>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-border bg-background-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-gradient text-lg mb-3">ERIS</h3>
                  <p className="text-sm text-text-secondary">
                    Ecosystem Relationship Intelligence System
                  </p>
                </div>
                <div>
                  <h3 className="text-text-primary text-sm font-semibold mb-3">
                    Platform
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li><Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
                    <li><Link href="/matching" className="hover:text-accent transition-colors">Mentor Matching</Link></li>
                    <li><Link href="/programmes" className="hover:text-accent transition-colors">Programmes</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-text-primary text-sm font-semibold mb-3">
                    Powered By
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
                    <span className="badge badge-neutral">Next.js 14</span>
                    <span className="badge badge-neutral">Gemini AI</span>
                    <span className="badge badge-neutral">Firebase</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-xs text-text-secondary">
                  © 2026 ERIS. MyHack 2026 | Build With AI KL
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
