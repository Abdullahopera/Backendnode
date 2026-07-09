import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ token, onLogout }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
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

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-bold text-primary-700">BuyIt</span>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden sm:block">Hi, {user.name}</span>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Products</h1>
          <p className="text-gray-500">Browse, search, and find exactly what you need</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products by name or description..."
                className="input-field pl-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Search</button>
          </div>
        </form>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-xl mb-4" />
                <div className="bg-gray-200 h-4 w-3/4 rounded mb-2" />
                <div className="bg-gray-200 h-4 w-1/2 rounded mb-2" />
                <div className="bg-gray-200 h-4 w-1/4 rounded" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="card group cursor-pointer">
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {product.category === 'electronics' ? '📱' : product.category === 'clothing' ? '👕' : product.category === 'books' ? '📚' : product.category === 'home' ? '🏠' : product.category === 'sports' ? '⚽' : '📦'}
                    </span>
                    {product.rating > 0 && (
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-yellow-600 shadow-sm">
                        ⭐ {product.rating}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary-600">${product.price?.toFixed(2)}</span>
                      {product.category && (
                        <span className="text-xs bg-primary-50 text-primary-600 px-2.5 py-1 rounded-full font-medium capitalize">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ← Prev
                </button>
                {[...Array(pagination.pages)].slice(0, 5).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded-xl transition ${
                      page === i + 1
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
