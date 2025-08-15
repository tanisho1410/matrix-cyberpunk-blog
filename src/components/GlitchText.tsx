'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'always' | 'once';
}

export default function GlitchText({ 
  text, 
  className = '',
  glitchIntensity = 'medium',
  trigger = 'hover'
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(trigger === 'always');
  const [displayText, setDisplayText] = useState(text);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

  const intensitySettings = {
    low: { duration: 100, frequency: 0.1, scrambleChance: 0.1 },
    medium: { duration: 150, frequency: 0.2, scrambleChance: 0.2 },
    high: { duration: 200, frequency: 0.3, scrambleChance: 0.3 }
  };

  const settings = intensitySettings[glitchIntensity];

  useEffect(() => {
    if (!isGlitching) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() < settings.frequency) {
        // Scramble text
        const scrambledText = text
          .split('')
          .map(char => {
            if (char === ' ') return ' ';
            return Math.random() < settings.scrambleChance 
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char;
          })
          .join('');

        setDisplayText(scrambledText);

        // Restore original text after glitch duration
        setTimeout(() => {
          setDisplayText(text);
        }, settings.duration);
      }
    }, 100);

    // Stop glitching if trigger is 'once'
    if (trigger === 'once') {
      setTimeout(() => {
        setIsGlitching(false);
      }, 2000);
    }

    return () => clearInterval(glitchInterval);
  }, [isGlitching, text, settings, trigger, glitchChars]);

  const glitchVariants = {
    normal: {
      textShadow: '0 0 0px transparent',
      transform: 'translate(0, 0)'
    },
    glitch: {
      textShadow: [
        '2px 0 0 #00ffff, -2px 0 0 #ff0040',
        '-2px 0 0 #00ffff, 2px 0 0 #ff0040',
        '2px 0 0 #00ffff, -2px 0 0 #ff0040'
      ],
      transform: [
        'translate(0, 0)',
        'translate(-1px, 1px)',
        'translate(1px, -1px)',
        'translate(0, 0)'
      ],
      transition: {
        duration: 0.2,
        times: [0, 0.33, 0.66, 1],
        repeat: Infinity,
        repeatType: 'reverse' as const
      }
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsGlitching(false);
      setDisplayText(text);
    }
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={glitchVariants}
      animate={isGlitching ? 'glitch' : 'normal'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily: 'Fira Code, monospace',
        position: 'relative'
      }}
    >
      {displayText}
      
      {/* Additional glitch layers for more intensity */}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-cyan-400 opacity-70"
            style={{
              transform: 'translate(-1px, 0)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
            }}
          >
            {displayText}
          </span>
          <span
            className="absolute inset-0 text-red-500 opacity-70"
            style={{
              transform: 'translate(1px, 0)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
            }}
          >
            {displayText}
          </span>
        </>
      )}
    </motion.span>
  );
}