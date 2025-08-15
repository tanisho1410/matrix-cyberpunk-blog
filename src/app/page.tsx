import MatrixRain from '@/components/MatrixRain';
import ParticleField from '@/components/ParticleField';
import TerminalLayout from '@/components/TerminalLayout';
import BlogCard from '@/components/BlogCard';
import GlitchText from '@/components/GlitchText';
import TypingAnimation from '@/components/TypingAnimation';

// Sample blog data
const blogPosts = [
  {
    id: '1',
    title: 'Deep Learning in the Matrix',
    excerpt: 'Exploring neural networks through the lens of cyberpunk philosophy and digital consciousness.',
    date: '2024-12-15',
    author: 'Neo_Coder',
    tags: ['AI', 'Philosophy', 'Deep Learning'],
    readTime: '5 min read',
    slug: 'deep-learning-matrix'
  },
  {
    id: '2',
    title: 'Quantum Computing Revolution',
    excerpt: 'Breaking down the barriers between classical and quantum realms in modern computing.',
    date: '2024-12-10',
    author: 'Morpheus_Dev',
    tags: ['Quantum', 'Computing', 'Future Tech'],
    readTime: '8 min read',
    slug: 'quantum-computing-revolution'
  },
  {
    id: '3',
    title: 'Cybersecurity in 2025',
    excerpt: 'Advanced encryption techniques and defense strategies against sophisticated cyber threats.',
    date: '2024-12-05',
    author: 'Trinity_Sec',
    tags: ['Security', 'Encryption', 'Cyberpunk'],
    readTime: '6 min read',
    slug: 'cybersecurity-2025'
  }
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <ParticleField mouseInteraction={true} particleCount={80} />
      
      {/* Main Content */}
      <TerminalLayout>
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mb-6">
            <GlitchText 
              text="MATRIX_BLOG.exe"
              className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4 block"
              glitchIntensity="high"
              trigger="always"
            />
          </div>
          
          <div className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            <TypingAnimation 
              text="Welcome to the digital realm where code meets consciousness. Explore the intersection of technology, philosophy, and the future of human-computer interaction."
              speed={30}
              startDelay={1000}
            />
          </div>

          <div className="text-sm text-cyan-400 font-mono">
            <TypingAnimation 
              text="$ Initializing blog interface... Ready for neural link."
              speed={50}
              startDelay={4000}
              showCursor={true}
            />
          </div>
        </section>

        {/* Navigation */}
        <nav className="mb-8 flex flex-wrap justify-center gap-4 text-sm font-mono">
          {['All Posts', 'AI & ML', 'Cybersecurity', 'Quantum Tech', 'Philosophy'].map((item) => (
            <button
              key={item}
              className="px-4 py-2 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 rounded"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Blog Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </section>

        {/* Status Bar */}
        <div className="mt-12 p-4 bg-black/50 border border-gray-700 rounded text-xs font-mono text-gray-400">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-green-400">● ONLINE</span>
              <span>Posts: {blogPosts.length}</span>
              <span>Last Update: 2024-12-15</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>CPU: 42%</span>
              <span>Memory: 1.2GB</span>
              <span className="text-cyan-400">Neural Link: Active</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-500 font-mono">
          <div className="mb-2">
            <GlitchText 
              text="Matrix Blog System v3.1.4"
              className="text-gray-400"
              glitchIntensity="low"
              trigger="hover"
            />
          </div>
          <div>
            Built with React, Next.js, and digital dreams | 
            <span className="text-cyan-400 ml-1">Welcome to the Real World</span>
          </div>
        </footer>
      </TerminalLayout>
    </div>
  );
}
