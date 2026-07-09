import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Products', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { label: 'Add Product', icon: 'M12 4v16m8-8H4', action: '/product/new' },
  { label: 'Sign Out', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1', action: 'logout' },
];

export default function Dashboard({ token, onLogout }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetch('/api/v1/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [page, token]);

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      const q = query || search;
      const url = `/api/v1/products?page=${page}&limit=12${q ? `&search=${encodeURIComponent(q)}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(search);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/v1/products/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Delete failed');
        return;
      }
      setDeleteId(null);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleNav = (item) => {
    setSidebarOpen(false);
    if (item === 'logout') {
      onLogout();
      navigate('/');
    } else if (item) {
      navigate(item);
    }
  };

  return (
    <div className="min-h-screen aurora-bg">
      <div className="aurora-dot-1" />

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 glass border-r border-white/10 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-primary-500/30">B</div>
            <div>
              <span className="text-lg font-bold text-white">BuyIt</span>
              <p className="text-xs text-white/40">Product Dashboard</p>
            </div>
          </div>
        </div>

        {user && (
          <div className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-300 text-sm font-bold">{user.name?.charAt(0)?.toUpperCase()}</div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-white/40 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, icon, action }) => (
            <button
              key={label}
              onClick={() => handleNav(action)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 group"
            >
              <svg className="w-5 h-5 text-white/40 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/20 text-center">BuyIt v1.0</p>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64 relative z-10">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass border-b border-white/10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex-1 lg:flex-none">
              <h1 className="text-lg font-semibold text-white">Discover Products</h1>
              <p className="text-xs text-white/40">Browse, search, and find exactly what you need</p>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-3 max-w-2xl">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  className="glass-input pl-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-glass">Search</button>
            </div>
          </form>

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-card p-4 animate-pulse">
                  <div className="bg-white/5 h-48 rounded-xl mb-4" />
                  <div className="bg-white/5 h-4 w-3/4 rounded mb-2" />
                  <div className="bg-white/5 h-4 w-1/2 rounded mb-2" />
                  <div className="bg-white/5 h-4 w-1/4 rounded" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 floating">🔍</div>
              <h3 className="text-xl font-semibold text-white/70 mb-2">No products found</h3>
              <p className="text-white/40">Try a different search term</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="glass-card group">
                    <div className="relative h-48 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-surface-700 flex items-center justify-center overflow-hidden">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {product.category === 'electronics' ? '📱' : product.category === 'clothing' ? '👕' : product.category === 'books' ? '📚' : product.category === 'home' ? '🏠' : product.category === 'sports' ? '⚽' : '📦'}
                      </span>
                      {product.rating > 0 && (
                        <span className="absolute top-3 right-3 glass rounded-lg px-2.5 py-1 text-sm font-medium text-accent-300">
                          ⭐ {product.rating}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-lg mb-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-white/50 mb-3 line-clamp-2">{product.description}</p>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-accent-400">${product.price?.toFixed(2)}</span>
                        {product.category && (
                          <span className="text-xs bg-primary-500/10 text-primary-300 px-2.5 py-1 rounded-full font-medium capitalize border border-primary-500/20">
                            {product.category}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => navigate(`/product/edit/${product._id}`)} className="flex-1 px-3 py-2 text-sm font-medium text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 rounded-xl transition border border-primary-500/20">
                          Edit
                        </button>
                        <button onClick={() => setDeleteId(product._id)} className="flex-1 px-3 py-2 text-sm font-medium text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition border border-red-500/20">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="glass-card px-4 py-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition">← Prev</button>
                  {[...Array(pagination.pages)].slice(0, 5).map((_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-xl text-sm transition ${page === i + 1 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'glass-card text-white/60 hover:text-white'}`}>{i + 1}</button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages} className="glass-card px-4 py-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition">Next →</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4" onClick={() => setDeleteId(null)}>
          <div className="glass-card p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Delete Product?</h3>
              <p className="text-sm text-white/50 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 glass rounded-xl text-white/70 hover:text-white transition font-medium">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition font-medium">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
