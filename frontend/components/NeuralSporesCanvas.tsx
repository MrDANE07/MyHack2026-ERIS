'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  baseX: number
  baseY: number
}

export function NeuralSporesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 150,
  })
  const animationFrameRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()

  const getColors = useCallback(() => {
    const isDark = resolvedTheme === 'dark'
    return {
      teal: isDark ? 'rgba(0, 255, 209,' : 'rgba(0, 200, 170,',
      violet: isDark ? 'rgba(191, 95, 255,' : 'rgba(160, 80, 220,',
      amber: isDark ? 'rgba(255, 184, 48,' : 'rgba(220, 160, 40,',
      lineOpacity: isDark ? 0.15 : 0.08,
      particleOpacity: isDark ? 0.7 : 0.5,
    }
  }, [resolvedTheme])

  const initParticles = useCallback((width: number, height: number) => {
    const colors = getColors()
    const numberOfParticles = Math.floor((width * height) / 15000)
    const particles: Particle[] = []

    for (let i = 0; i < numberOfParticles; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const rand = Math.random()
      let color: string

      if (rand < 0.33) color = colors.teal
      else if (rand < 0.66) color = colors.violet
      else color = colors.amber

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color,
      })
    }

    return particles
  }, [getColors])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseOut = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    const connect = (particles: Particle[], width: number, height: number) => {
      const colors = getColors()
      const maxDistance = (width / 7) * (height / 7)

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = dx * dx + dy * dy

          if (distance < maxDistance) {
            const opacityValue = 1 - distance / 20000
            if (opacityValue > 0) {
              ctx.strokeStyle = particles[a].color + opacityValue * colors.lineOpacity + ')'
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particles[a].x, particles[a].y)
              ctx.lineTo(particles[b].x, particles[b].y)
              ctx.stroke()
            }
          }
        }
      }
    }

    const animate = () => {
      const colors = getColors()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction (repel particles)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
            particle.x -= forceDirectionX * force * 2
            particle.y -= forceDirectionY * force * 2
          }
        }

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + colors.particleOpacity + ')'
        ctx.fill()
      }

      connect(particles, canvas.width, canvas.height)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [initParticles, getColors])

  return (
    <canvas
      ref={canvasRef}
      id="bio-canvas"
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  )
}
