'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  mouseInteraction?: boolean;
  particleCount?: number;
  className?: string;
}

export default function ParticleField({ 
  mouseInteraction = true,
  particleCount = 100,
  className = ''
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle colors
    const colors = ['#00FF41', '#00D9FF', '#FF0040', '#9D00FF'];

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: Math.random() * 200 + 100
        });
      }
    };

    initParticles();

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => setIsMouseOver(true);
    const handleMouseLeave = () => setIsMouseOver(false);

    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(13, 2, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Update particle life
        particle.life++;

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Mouse interaction
        if (mouseInteraction && isMouseOver) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;

            // Increase opacity near mouse
            particle.opacity = Math.min(1, particle.opacity + force * 0.02);
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary checking with wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Fade out over lifetime
        const lifeFactor = 1 - (particle.life / particle.maxLife);
        const currentOpacity = particle.opacity * lifeFactor;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const opacity = (80 - distance) / 80 * 0.1;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Add new particles to maintain count
      while (particles.length < particleCount) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: Math.random() * 200 + 100
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseInteraction, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}