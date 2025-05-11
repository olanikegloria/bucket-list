"use client"

import { useEffect, useRef } from "react"

export function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Skip if no canvas or if not in browser
    if (!canvasRef.current || typeof window === "undefined") return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Confetti particles
    const particles: Particle[] = []
    const particleCount = 50 // Number of particles

    // Particle types - only using hearts, flowers, and ribbons
    const particleTypes = ["🌸", "💖", "🎀"]

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      type: string
      rotation: number
      rotationSpeed: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -20 // Start above the screen
        this.size = Math.random() * 15 + 10 // Size between 10-25
        this.speedX = Math.random() * 2 - 1 // Speed between -1 and 1
        this.speedY = Math.random() * 1 + 0.5 // Fall speed between 0.5 and 1.5
        this.type = particleTypes[Math.floor(Math.random() * particleTypes.length)]
        this.rotation = Math.random() * 360
        this.rotationSpeed = Math.random() * 0.5 - 0.25 // Rotation speed
        this.opacity = Math.random() * 0.3 + 0.5 // Opacity between 0.5 and 0.8
      }

      update() {
        // Add some gentle swaying motion
        this.speedX += Math.random() * 0.2 - 0.1
        this.speedX = Math.max(-1, Math.min(1, this.speedX)) // Limit horizontal speed

        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        // If particle reaches bottom, slow it down and eventually stop
        if (this.y > canvas.height - 50) {
          this.speedY *= 0.95 // Slow down
          this.speedX *= 0.95

          // If almost stopped, keep it at the bottom
          if (this.speedY < 0.1) {
            this.speedY = 0
            this.speedX = 0
          }
        }

        // If particle goes off screen horizontally, wrap around
        if (this.x < -20) this.x = canvas.width + 20
        if (this.x > canvas.width + 20) this.x = -20
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.rotation * Math.PI) / 180)
        ctx.globalAlpha = this.opacity
        ctx.font = `${this.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(this.type, 0, 0)
        ctx.restore()
      }

      // Reset particle to top when it goes off screen
      reset() {
        if (this.y > canvas.height + 50 && this.speedY > 0) {
          this.y = -20
          this.x = Math.random() * canvas.width
          this.speedY = Math.random() * 1 + 0.5
          this.speedX = Math.random() * 2 - 1
        }
      }
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles throughout the screen initially
      const particle = new Particle()
      particle.y = Math.random() * canvas.height
      particles.push(particle)
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
        particle.reset()
      })

      // Add new particles occasionally
      if (Math.random() < 0.05 && particles.length < 100) {
        particles.push(new Particle())
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  )
}

