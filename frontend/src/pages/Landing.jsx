import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 md:px-16">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🛍️</span>
          <span className="text-2xl font-bold text-white tracking-tight">BuyIt</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="px-6 py-2.5 text-white font-medium hover:bg-white/10 rounded-lg transition">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2.5 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition shadow-lg">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Shop smarter, not harder
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Discover What You
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Love to Buy</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-xl mx-auto leading-relaxed">
            Browse thousands of products, find the best deals, and shop with confidence — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-10 py-4">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-outline border-white text-white hover:bg-white/10 text-lg px-10 py-4">
              I already have an account
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-primary-200 text-sm">
        &copy; 2026 BuyIt. All rights reserved.
      </footer>
    </div>
  );
}
