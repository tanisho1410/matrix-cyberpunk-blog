'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

export default function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Matrix characters - mix of Japanese katakana, numbers, and symbols
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const matrixArray = matrixChars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent black background for trailing effect
      ctx.fillStyle = 'rgba(13, 2, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      ctx.textAlign = 'center';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        
        // Calculate position
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        // Add glow effect for some characters
        if (Math.random() > 0.98) {
          ctx.shadowColor = '#00FF41';
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }

        // Fade effect - characters at the top are brighter
        const opacity = Math.min(1, Math.max(0.1, 1 - (y / canvas.height) * 2));
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
        
        ctx.fillText(char, x, y);

        // Reset drop if it reaches bottom or randomly
        if (y > canvas.height || Math.random() > 0.975) {
          drops[i] = Math.random() * -100;
        }

        // Move drop down
        drops[i] += 0.5;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, #0D0208 0%, #001100 50%, #0D0208 100%)'
      }}
    />
  );
}