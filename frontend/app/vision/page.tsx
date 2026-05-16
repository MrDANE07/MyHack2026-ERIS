'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hexagon, Network, Sparkles } from 'lucide-react'

type NodeKey = 'startup' | 'mentor' | 'programme' | 'partner' | 'initiative' | 'service'

interface NodeData {
  id: NodeKey
  label: string
  icon: string
  position: { x: number; y: number }
  delay: number
  color: string
  glow: string
}

export default function VisionPage() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [hoveredNode, setHoveredNode] = useState<NodeKey | null>(null)

  // Center point for the circular layout
  const centerX = 300
  const centerY = 300
  const radius = 180 // Distance from center

  // Create nodes in a circular arrangement
  const nodes: NodeData[] = [
    {
      id: 'startup',
      label: 'Startup',
      icon: '🚀',
      position: { x: centerX + Math.cos(Math.PI * 0.5) * radius, y: centerY + Math.sin(Math.PI * 0.5) * radius },
      delay: 0,
      color: '#00D99A',
      glow: 'rgba(0, 217, 154, 0.6)'
    },
    {
      id: 'mentor',
      label: 'Mentor',
      icon: '👨‍💼',
      position: { x: centerX + Math.cos(Math.PI * 1.17) * radius, y: centerY + Math.sin(Math.PI * 1.17) * radius },
      delay: 0.2,
      color: '#BF5FFF',
      glow: 'rgba(191, 95, 255, 0.6)'
    },
    {
      id: 'programme',
      label: 'Programme',
      icon: '📋',
      position: { x: centerX + Math.cos(Math.PI * 1.83) * radius, y: centerY + Math.sin(Math.PI * 1.83) * radius },
      delay: 0.4,
      color: '#FFB830',
      glow: 'rgba(255, 184, 48, 0.6)'
    },
    {
      id: 'partner',
      label: 'Partner',
      icon: '🤝',
      position: { x: centerX + Math.cos(Math.PI * 2.5) * radius, y: centerY + Math.sin(Math.PI * 2.5) * radius },
      delay: 0.6,
      color: '#00D99A',
      glow: 'rgba(0, 217, 154, 0.6)'
    },
    {
      id: 'initiative',
      label: 'Initiative',
      icon: '💡',
      position: { x: centerX + Math.cos(Math.PI * 3.17) * radius, y: centerY + Math.sin(Math.PI * 3.17) * radius },
      delay: 0.8,
      color: '#BF5FF0',
      glow: 'rgba(191, 95, 240, 0.6)'
    },
    {
      id: 'service',
      label: 'Service Provider',
      icon: '⚙️',
      position: { x: centerX + Math.cos(Math.PI * 3.83) * radius, y: centerY + Math.sin(Math.PI * 3.83) * radius },
      delay: 1.0,
      color: '#FFB830',
      glow: 'rgba(255, 184, 48, 0.6)'
    }
  ]

  const centerNode = {
    label: 'ERIS\nRelationship Intelligence\nLayer',
    position: { x: centerX, y: centerY }
  }

  // All ecosystem entities connect through ERIS as the central hub
  const connections = nodes.map((node, index) => ({
    from: node.id,
    to: 'center', // Will connect to center node
    delay: node.delay
  }))

  const getNode = (id: NodeKey) => nodes.find(n => n.id === id)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050810] via-[#0a0f1a] to-[#050810] dark:opacity-100 opacity-0" />
      <div className="fixed inset-0 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] dark:opacity-0 opacity-100" />

      {/* Radial glow spots */}
      <div className="fixed inset-0 dark:opacity-100 opacity-30 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_hsla(156,100%,43%,0.12)_0%,_transparent_60%)]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_hsla(275,100%,69%,0.1)_0%,_transparent_60%)]" />
        <div className="absolute bottom-[15%] left-[30%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_hsla(38,100%,59%,0.08)_0%,_transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Network className="h-12 w-12 text-[#00D99A] animate-pulse" />
            <h1 className="text-5xl font-bold tracking-wider glow-teal">
              Beyond Mentor Matching
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            ERIS is designed as a reusable relationship intelligence infrastructure layer for
            ecosystem-wide coordination.
          </motion.p>
        </motion.div>

        {/* Ecosystem Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative"
        >
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '600px' }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D99A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#BF5FFF" stopOpacity="0.8" />
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
              // Connect to center node
              const toX = centerNode.position.x
              const toY = centerNode.position.y
              if (!fromNode) return null

              return (
                <motion.line
                  key={`${conn.from}-center`}
                  x1={fromNode.position.x}
                  y1={fromNode.position.y}
                  x2={toX}
                  y2={toY}
                  stroke={fromNode.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: [0.3, 0.7, 0.3], pathLength: 1 }}
                  transition={{
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      delay: conn.delay
                    },
                    pathLength: {
                      delay: conn.delay,
                      duration: 1
                    }
                  }}
                />
              )
            })}
          </svg>

          {/* Center ERIS Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute z-20"
            style={{
              left: `calc(50% + ${centerNode.position.x - 300}px)`,
              top: `calc(50% + ${centerNode.position.y - 300}px)`,
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
              <Hexagon className="h-48 w-48 text-[#00D99A] drop-shadow-[0_0_30px_rgba(0,217,154,0.5)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold glow-teal">ERIS</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Relationship Intelligence
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Spinning particles around center */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-[#00D99A]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7
                }}
                style={{
                  filter: 'blur(4px)',
                  transform: `rotate(${i * 120}deg) translateX(100px)`
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
                scale: 0
              }}
              animate={{
                opacity: 1,
                scale: hoveredNode === node.id ? 1.15 : 1
              }}
              transition={{ delay: node.delay, duration: 0.6 }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              className="absolute z-10 cursor-pointer"
              style={{
                left: `calc(50% + ${node.position.x - 300}px)`,
                top: `calc(50% + ${node.position.y - 300}px)`,
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
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className="glass-card p-4 min-w-[120px] text-center"
                style={{
                  borderColor: node.color,
                  borderWidth: '2px'
                }}
              >
                <div className="text-3xl mb-2">{node.icon}</div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: node.color }}
                >
                  {node.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Explanatory Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-[#00D99A]" />
              <h2 className="text-2xl font-bold">Future Ecosystem Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Although our MVP currently focuses on Startup-to-Mentor relationships, the same
              relationship intelligence framework can later support ecosystem-wide coordination.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Startups', color: '#00D99A' },
                { label: 'Mentors', color: '#BF5FFF' },
                { label: 'Programmes', color: '#FFB830' },
                { label: 'Partners', color: '#00D99A' }
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + idx * 0.1 }}
                  className="text-center p-3 rounded-lg bg-background/50"
                  style={{ borderLeft: `3px solid ${item.color}` }}
                >
                  <div className="text-sm font-semibold" style={{ color: item.color }}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
