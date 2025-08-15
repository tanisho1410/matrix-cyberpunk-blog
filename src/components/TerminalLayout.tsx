'use client';

import { ReactNode } from 'react';
import { Terminal, Minimize2, Maximize2, X } from 'lucide-react';

interface TerminalLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function TerminalLayout({ 
  children, 
  title = 'SYSTEM_MATRIX_BLOG.exe',
  className = '' 
}: TerminalLayoutProps) {
  return (
    <div className={`relative z-10 mx-auto max-w-6xl p-4 ${className}`}>
      {/* Terminal Window */}
      <div className="neon-border bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-700">
          {/* Window Controls */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors"></div>
          </div>

          {/* Terminal Title */}
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Terminal size={16} className="text-cyan-400" />
            <span className="font-mono">{title}</span>
          </div>

          {/* Window Actions */}
          <div className="flex items-center space-x-1">
            <button className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors">
              <Minimize2 size={14} />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors">
              <Maximize2 size={14} />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 bg-black/50 backdrop-blur-sm min-h-screen">
          {/* System Boot Message */}
          <div className="mb-6 text-xs font-mono text-gray-400 border-l-2 border-cyan-400 pl-3">
            <div className="mb-1">MATRIX_OS v3.1.4 [CYBERPUNK_MODE]</div>
            <div className="mb-1">Initializing neural interface...</div>
            <div className="mb-1 text-green-400">✓ Connection established</div>
            <div className="mb-1 text-green-400">✓ Security protocols active</div>
            <div className="text-cyan-400">$ Welcome to the Matrix Blog Terminal</div>
          </div>

          {/* Content Area */}
          <div className="relative">
            {children}
          </div>

          {/* Terminal Prompt */}
          <div className="mt-8 flex items-center text-sm font-mono text-gray-300">
            <span className="text-cyan-400">guest@matrix-blog</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-400">~/blog</span>
            <span className="text-gray-300 ml-1">$</span>
            <span className="ml-2 cursor animate-pulse">_</span>
          </div>
        </div>
      </div>

      {/* ASCII Art Decoration */}
      <div className="mt-4 text-xs font-mono text-green-400/30 text-center select-none">
        <pre className="inline-block">
{`
    ╔══════════════════════════════════════╗
    ║  ▓▓▓▓▓▓▓▓▓▓▓  MATRIX BLOG  ▓▓▓▓▓▓▓▓▓▓▓  ║
    ╚══════════════════════════════════════╝
`}
        </pre>
      </div>
    </div>
  );
}