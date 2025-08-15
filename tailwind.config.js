/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Matrix Cyberpunk Color Palette
        'matrix-green': '#00FF41',
        'matrix-green-dark': '#00CC33',
        'matrix-green-light': '#66FF80',
        'deep-black': '#0D0208',
        'cyber-black': '#0F0F0F',
        'cyan-blue': '#00D9FF',
        'cyan-glow': '#00E6FF',
        'red-alert': '#FF0040',
        'red-glow': '#FF1A55',
        'neon-purple': '#9D00FF',
        'electric-blue': '#0080FF',
      },
      fontFamily: {
        'mono': ['Fira Code', 'Source Code Pro', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'matrix-rain': 'matrix-rain 2s linear infinite',
        'matrix-glow': 'matrix-glow 2s ease-in-out infinite alternate',
        'glitch': 'glitch 0.3s infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'matrix-glow': {
          '0%, 100%': { textShadow: '0 0 5px #00FF41' },
          '50%': { textShadow: '0 0 20px #00FF41, 0 0 30px #00FF41' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 15px #00FF41',
          },
          '50%': { 
            boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          'from': { transform: 'translateY(50px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      backgroundImage: {
        'matrix-gradient': 'linear-gradient(135deg, #0D0208 0%, #001100 50%, #0D0208 100%)',
        'terminal-gradient': 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
        'cyber-grid': `
          linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      blur: {
        'xs': '2px',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    // Custom plugin for terminal-style utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-green': {
          textShadow: '0 0 10px #00FF41',
        },
        '.text-shadow-cyan': {
          textShadow: '0 0 10px #00D9FF',
        },
        '.text-shadow-red': {
          textShadow: '0 0 10px #FF0040',
        },
        '.terminal-border': {
          border: '1px solid rgba(0, 255, 65, 0.3)',
          background: 'rgba(0, 0, 0, 0.8)',
        },
        '.neon-glow-green': {
          boxShadow: '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 15px #00FF41',
        },
        '.neon-glow-cyan': {
          boxShadow: '0 0 5px #00D9FF, 0 0 10px #00D9FF, 0 0 15px #00D9FF',
        },
        '.scrollbar-matrix': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0D0208',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#00FF41',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#66FF80',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};