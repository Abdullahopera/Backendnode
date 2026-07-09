import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen aurora-bg flex flex-col">
      <div className="aurora-dot-1" />
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-primary-500/30">B</div>
          <span className="text-xl font-bold text-white tracking-tight">BuyIt</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="px-6 py-2.5 text-white/80 hover:text-white font-medium hover:bg-white/5 rounded-lg transition">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2.5 glass-card text-white font-semibold hover:bg-white/10 transition shadow-lg">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm text-white/70 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Shop smarter, not harder
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Discover What You
            <span className="block text-gradient">Love to Buy</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse thousands of products, find the best deals, and shop with confidence — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-glass text-lg px-10 py-4">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-glass-outline text-lg px-10 py-4">
              I already have an account
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-6 text-white/30 text-sm">
        &copy; 2026 BuyIt. All rights reserved.
      </footer>
    </div>
  );
}
