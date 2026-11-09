import React, { useCallback, useEffect, useRef } from 'react'

interface ConfettiCanvasProps {
  burstKey: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  shape: 'rect' | 'circle' | 'heart'
  opacity: number
}

const COLORS = [
  '#ff4d6d',
  '#ff8fab',
  '#ffd166',
  '#4cc9f0',
  '#9d4edd',
  '#06d6a0',
  '#ff9f1c',
]

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ burstKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafIdRef = useRef<number | null>(null)

  const startLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      return
    }
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const remaining: Particle[] = []
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.24
        p.vx *= 0.99
        p.rotation += p.rotationSpeed
        if (p.y > canvas.height * 0.75) {
          p.opacity -= 0.018
        }

        if (p.y < canvas.height + 40 && p.opacity > 0.02) {
          remaining.push(p)

          ctx.save()
          ctx.globalAlpha = Math.max(0, p.opacity)
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          ctx.fillStyle = p.color

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66)
          } else if (p.shape === 'circle') {
            ctx.beginPath()
            ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2)
            ctx.fill()
          } else {
            const s = p.size * 0.45
            ctx.beginPath()
            ctx.moveTo(0, s * 0.4)
            ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.4, s * 0.6, 0, s * 1.4)
            ctx.bezierCurveTo(s * 1.4, s * 0.6, s, -s * 0.5, 0, s * 0.4)
            ctx.fill()
          }
          ctx.restore()
        }
      }

      particlesRef.current = remaining
      if (remaining.length > 0) {
        rafIdRef.current = window.requestAnimationFrame(render)
      } else {
        rafIdRef.current = null
      }
    }

    rafIdRef.current = window.requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    if (burstKey === 0) {
      return
    }
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const shapes: Particle['shape'][] = ['rect', 'circle', 'heart']
    const newParticles: Particle[] = Array.from({ length: 110 }, (_, idx) => {
      const fromLeft = idx % 2 === 0
      const startX = fromLeft ? width * 0.25 : width * 0.75
      const startY = height * 0.55
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.35
      const speed = 7 + Math.random() * 11

      return {
        x: startX + (Math.random() - 0.5) * 140,
        y: startY + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 7 + Math.random() * 7,
        color: COLORS[idx % COLORS.length],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.22,
        shape: shapes[idx % shapes.length],
        opacity: 1,
      }
    })

    particlesRef.current.push(...newParticles)
    startLoop()
  }, [burstKey, startLoop])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      aria-hidden="true"
    />
  )
}
