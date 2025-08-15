'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Tag, ExternalLink } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const glitchVariants = {
    hover: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative"
    >
      {/* Code Block Container */}
      <div className="relative bg-black/80 border border-gray-700 rounded-lg overflow-hidden backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
        {/* Code Block Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs font-mono text-gray-400">
              {post.slug}.md
            </span>
          </div>
          <div className="text-xs font-mono text-gray-500">
            {post.readTime}
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 space-y-4">
          {/* Line Numbers & Content */}
          <div className="flex">
            {/* Line Numbers */}
            <div className="flex-shrink-0 w-8 text-xs font-mono text-gray-500 text-right pr-4 space-y-1">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
            </div>

            {/* Code Content */}
            <div className="flex-1 space-y-1 text-sm font-mono">
              {/* Title as Function */}
              <div className="text-cyan-400">
                <span className="text-purple-400">function</span>{' '}
                <motion.span 
                  className="text-yellow-300 hover:text-yellow-200 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  {post.title.replace(/\s+/g, '_').toLowerCase()}
                </motion.span>
                <span className="text-gray-300">() {'{'}</span>
              </div>

              {/* Content as Comments */}
              <div className="text-gray-400 pl-4">
                <span className="text-green-400">// {post.excerpt}</span>
              </div>

              {/* Metadata as Variables */}
              <div className="text-gray-300 pl-4">
                <span className="text-blue-400">const</span>{' '}
                <span className="text-white">publishDate</span>{' '}
                <span className="text-gray-400">=</span>{' '}
                <span className="text-green-300">"{post.date}"</span>;
              </div>

              <div className="text-gray-300 pl-4">
                <span className="text-blue-400">const</span>{' '}
                <span className="text-white">author</span>{' '}
                <span className="text-gray-400">=</span>{' '}
                <span className="text-green-300">"{post.author}"</span>;
              </div>

              {/* Tags as Array */}
              <div className="text-gray-300 pl-4">
                <span className="text-blue-400">const</span>{' '}
                <span className="text-white">tags</span>{' '}
                <span className="text-gray-400">=</span>{' '}
                <span className="text-yellow-300">[</span>
                {post.tags.map((tag, i) => (
                  <span key={tag}>
                    <span className="text-green-300">"{tag}"</span>
                    {i < post.tags.length - 1 && <span className="text-gray-400">, </span>}
                  </span>
                ))}
                <span className="text-yellow-300">]</span>;
              </div>

              <div className="text-gray-300">
                <span>{'}'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Read More Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-cyan-600 to-cyan-500 text-black text-xs font-semibold rounded hover:from-cyan-500 hover:to-cyan-400 transition-all duration-200"
            >
              <span>Execute</span>
              <ExternalLink size={12} />
            </motion.button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Matrix-style Border Animation */}
        <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/30 transition-all duration-300"></div>
      </div>

      {/* Floating Data Visualization */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
      </motion.div>
    </motion.article>
  );
}