'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  startDelay?: number;
  onComplete?: () => void;
  loop?: boolean;
  deleteSpeed?: number;
}

export default function TypingAnimation({
  text,
  speed = 50,
  className = '',
  showCursor = true,
  startDelay = 0,
  onComplete,
  loop = false,
  deleteSpeed = 30
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(0);
      }, startDelay);
      return () => clearTimeout(delayTimeout);
    }
  }, [startDelay]);

  useEffect(() => {
    if (!text || (startDelay > 0 && currentIndex === 0 && displayText === '')) {
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing
          setIsComplete(true);
          if (onComplete) onComplete();
          
          if (loop) {
            // Start deleting after a pause
            setTimeout(() => {
              setIsDeleting(true);
            }, 1000);
          }
        }
      } else {
        // Deleting backward
        if (currentIndex > 0) {
          setDisplayText(text.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting
          setIsDeleting(false);
          setIsComplete(false);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, speed, deleteSpeed, loop, onComplete, startDelay, displayText]);

  const cursorVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  return (
    <span className={`font-mono ${className}`}>
      <span className="text-matrix-green">
        {displayText}
      </span>
      {showCursor && (
        <motion.span
          variants={cursorVariants}
          animate="visible"
          initial="hidden"
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="text-matrix-green ml-1"
        >
          _
        </motion.span>
      )}
    </span>
  );
}