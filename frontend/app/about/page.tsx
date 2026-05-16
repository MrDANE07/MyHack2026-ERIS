'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { BioBackground } from '@/components/BioBackground'
import { ArrowLeft, Target, Network, Hexagon, Code2 } from 'lucide-react'

type NodeKey = 'startup' | 'mentor' | 'programme' | 'partner' | 'initiative' | 'service'

interface NodeData {
  id: NodeKey
  label: string
  icon: string
  position: { x: number; y: number }
  delay: number
  color: string
  glow: string
  isMVP?: boolean
}

export default function AboutPage() {
  const [hoveredNode, setHoveredNode] = useState<NodeKey | null>(null)

  const nodes: NodeData[] = [
    {
      id: 'startup',
      label: 'Startup',
      icon: '🚀',
      position: { x: 300, y: 500 },
      delay: 0,
      color: '#00D99A',
      glow: 'rgba(0, 217, 154, 0.6)',
      isMVP: true
    },
    {
      id: 'mentor',
      label: 'Mentor',
      icon: '👨‍💼',
      position: { x: 500, y: 300 },
      delay: 0,
      color: '#BF5FFF',
      glow: 'rgba(191, 95, 255, 0.6)',
      isMVP: true
    },
    {
      id: 'programme',
      label: 'Programme',
      icon: '📋',
      position: { x: 400, y: 100 },
      delay: 1.5,
      color: '#FFB830',
      glow: 'rgba(255, 184, 48, 0.6)'
    },
    {
      id: 'partner',
      label: 'Partner',
      icon: '🤝',
      position: { x: 100, y: 300 },
      delay: 2.0,
      color: '#00D99A',
      glow: 'rgba(0, 217, 154, 0.6)'
    },
    {
      id: 'initiative',
      label: 'Initiative',
      icon: '💡',
      position: { x: 150, y: 450 },
      delay: 2.5,
      color: '#BF5FF0',
      glow: 'rgba(191, 95, 240, 0.6)'
    },
    {
      id: 'service',
      label: 'Service Provider',
      icon: '⚙️',
      position: { x: 400, y: 550 },
      delay: 3.0,
      color: '#FFB830',
      glow: 'rgba(255, 184, 48, 0.6)'
    }
  ]

  const centerNode = {
    label: 'ERIS\nRelationship\nIntelligence\nLayer',
    position: { x: 300, y: 300 }
  }

  const connections = [
    { from: 'startup', to: 'mentor', delay: 0.8, isMVP: true },
    { from: 'startup', to: 'programme', delay: 1.8 },
    { from: 'startup', to: 'partner', delay: 2.3 },
    { from: 'startup', to: 'initiative', delay: 2.8 },
    { from: 'startup', to: 'service', delay: 3.3 },
    { from: 'programme', to: 'mentor', delay: 2.0 },
    { from: 'partner', to: 'mentor', delay: 2.5 },
    { from: 'service', to: 'mentor', delay: 3.0 }
  ]

  const getNode = (id: NodeKey) => nodes.find(n => n.id === id)

  return (
    <div className="min-h-screen relative">
      <BioBackground />
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="mb-12 animate-fade-in">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="hah4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bio-dot bio-dot-teal" />
            <span className="data-label glow-teal">About ERIS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-foreground">Ecosystem </span>
            <span className="text-gradient">Relationship Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Beyond mentor matching — a reusable infrastructure layer for ecosystem-wide coordination.
          </p>
        </div>

        {/* Mission Card - Reduced density */}
        <div className="glass-card p-8 hover-glow animate-fade-in delay-100 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <Target className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary/30 blur-lg" />
            </div>
            <div>
              <h2 className="text-2xl font font-semibold tracking-wide glow-teal">Infrastructure Layer</h2>
              <span className="data-id">Reusable relationship intelligence for entire ecosystem</span>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              ERIS (Ecosystem Relationship Intelligence System) is designed as a fundamental infrastructure layer
              that transcends simple mentor matching. While our MVP demonstrates Startup-to-Mentor connections,
              the architecture scales to coordinate relationships across programmes, partners, initiatives,
              and service providers within the same unified framework.
            </p>
            <p className="text-sm font-mono text-primary/80">
              Current: Startup ↔ Mentor matching (MVP implemented)
              <br />
              Future: Full ecosystem relationship orchestration
            </p>
          </div>
        </div>

        {/* Key Capabilities - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CapabilityCard
            icon={<Network className="h-6 w-6" />}
            title="Living Ecosystem"
            description="Relationship intelligence that grows and adapts as ecosystem expands"
            color="teal"
          />
          <CapabilityCard
            icon={<Code2 className="h-6 w-6" />}
            title="Scalable Architecture"
            description="API-first design supporting future ecosystem entities and integrations"
            color="violet"
          />
        </div>

        {/* Team Section */}
        <div className="glass-card p-6 hover-glow animate-fade-in delay-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="bio-dot bio-dot-violet" />
            <h2 className="text-xl font-semibold tracking-wide">Built for MyHackathon 2026</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Demonstrating ecosystem relationship intelligence architecture at scale
          </p>
        </div>

        {/* Ecosystem Relationship Intelligence Visualization */}
        <div className="glass-card p-8 hover-glow animate-fade-in delay-300 my-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <Hexagon className="h-7 w-7 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/30 blur-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-wide glow-teal">Ecosystem Relationship Map</h2>
              <span className="data-id">Live visualization of scalable architecture</span>
            </div>
          </div>

          <div className="relative mx-auto" style={{ height: '650px', maxWidth: '600px' }}>
            {/* SVG for connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D99A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#BF5FFF" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="connectionGradientMVP" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D99A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#BF5FFF" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {connections.map((conn, idx) => {
                const fromNode = getNode(conn.from as NodeKey)
                const toNode = getNode(conn.to as NodeKey)
                if (!fromNode || !toNode) return null

                return (
                  <motion.line
                    key={`${conn.from}-${conn.to}`}
                    x1={fromNode.position.x}
                    y1={fromNode.position.y}
                    x2={toNode.position.x}
                    y2={toNode.position.y}
                    stroke={conn.isMVP ? "url(#connectionGradientMVP)" : "url(#connectionGradient)"}
                    strokeWidth={conn.isMVP ? 3 : 2}
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                      opacity: conn.isMVP ? 0.8 : 0.5,
                      pathLength: 1,
                      strokeWidth: conn.isMVP ? 3 : hoveredNode === conn.from || hoveredNode === conn.to ? 2.5 : 2
                    }}
                    transition={{ delay: conn.delay, duration: 1 }}
                    style={{
                      animation: conn.isMVP ? 'pulse-line 2s ease-in-out infinite' : undefined
                    }}
                  />
                )
              })}
            </svg>

            {/* Center ERIS Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute z-20"
              style={{
                left: centerNode.position.x,
                top: centerNode.position.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <Hexagon className="h-40 w-40 text-[#00D99A] drop-shadow-[0_0_40px_rgba(0,217,154,0.6)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold glow-teal">ERIS</div>
                    <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                      Relationship Intelligence Layer
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pulsing particles around center */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#00D99A]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.4, 0.9, 0.4],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                  style={{
                    filter: 'blur(3px)',
                    transform: `rotate(${i * 60}deg) translateX(85px)`
                  }}
                />
              ))}
            </motion.div>

            {/* Surrounding Nodes */}
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: centerNode.position.x,
                  y: centerNode.position.y
                }}
                animate={{
                  opacity: node.isMVP ? 1 : hoveredNode === node.id ? 1 : 0.7,
                  scale: hoveredNode === node.id ? 1.15 : 1,
                  x: node.position.x,
                  y: node.position.y
                }}
                transition={{ delay: node.delay, duration: 0.6 }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                className="absolute z-10 cursor-pointer"
                style={{
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div
                  animate={hoveredNode === node.id ? {
                    boxShadow: [
                      `0 0 20px ${node.glow}`,
                      `0 0 40px ${node.glow}`,
                      `0 0 20px ${node.glow}`
                    ]
                  } : {
                    boxShadow: node.isMVP ? `0 0 30px ${node.glow}` : `0 0 15px ${node.glow}`
                  }}
                  transition={{ duration: 1, repeat: node.isMVP ? Infinity : undefined }}
                  className="glass-card p-3 min-w-[100px] text-center"
                  style={{
                    borderColor: node.color,
                    borderWidth: node.isMVP ? 2 : 1,
                    backgroundColor: node.isMVP ? 'hsla(220, 45%, 8%, 0.8)' : 'hsla(220, 45%, 8%, 0.5)'
                  }}
                >
                  <div className="text-2xl mb-1">{node.icon}</div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: node.color }}
                  >
                    {node.label}
                  </div>
                  {node.isMVP && (
                    <div className="mt-1">
                      <span className="data-id text-[8px] glow-teal">MVP</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00D99A]" />
              <span className="text-muted-foreground">Implemented (MVP)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#BF5FFF]" />
              <span className="text-muted-foreground">Future Scalability</span>
            </div>
          </div>
        </div>

        {/* Tech Stack - Visually lighter */}
        <div className="glass-card p-6 hover-glow animate-fade-in delay-400 opacity-70 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3 mb-4">
            <span className="bio-dot bio-dot-amber" />
            <h2 className="text-lg font-semibold tracking-wide">Technology Stack</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express', 'Firestore', 'Gemini AI'].map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded bg-background/50 border border-border/30 font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function CapabilityCard({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: 'teal' | 'violet' | 'amber'
}) {
  const colorClasses = {
    teal: 'text-primary border-primary/30 bg-primary/5 hover:bg-primary/10',
    violet: 'text-secondary border-secondary/30 bg-secondary/5 hover:bg-secondary/10',
    amber: 'text-accent border-accent/30 bg-accent/5 hover:bg-accent/10'
  }

  return (
    <div className={`glass-card p-6 hover-glow animate-fade-in group transition-all duration-300 border ${colorClasses[color]}`}>
      <div className="mb-3">
        <div className="inline-flex p-2 rounded-lg bg-background/50">
          {icon}
        </div>
      </div>
      <h3 className="text-base font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
