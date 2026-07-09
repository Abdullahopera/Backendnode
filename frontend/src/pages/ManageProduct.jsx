import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ManageProduct({ token }) {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`/api/v1/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data._id) setForm({ name: data.name, price: data.price, description: data.description || '', category: data.category || '' });
      })
      .catch(() => {});
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = isEdit ? `/api/v1/products/${id}` : '/api/v1/products';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen aurora-bg">
      <div className="aurora-dot-1" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <button onClick={() => navigate('/dashboard')} className="glass-card px-4 py-2 mb-8 text-sm text-white/70 hover:text-white flex items-center gap-2 w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Dashboard
        </button>

        <div className="text-center mb-10">
          <div className="text-5xl mb-4 floating">{isEdit ? '✏️' : '➕'}</div>
          <h1 className="text-3xl font-bold text-white">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-white/50 mt-2">{isEdit ? 'Update product details' : 'List a new product on BuyIt'}</p>
        </div>

        <div className="glass-card p-8">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Product Name</label>
              <input type="text" placeholder="e.g. Wireless Headphones" className="glass-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Price ($)</label>
              <input type="number" step="0.01" min="0" placeholder="29.99" className="glass-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Category</label>
              <select className="glass-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option className="bg-surface-800" value="">Select category</option>
                <option className="bg-surface-800" value="electronics">Electronics</option>
                <option className="bg-surface-800" value="clothing">Clothing</option>
                <option className="bg-surface-800" value="books">Books</option>
                <option className="bg-surface-800" value="home">Home</option>
                <option className="bg-surface-800" value="sports">Sports</option>
                <option className="bg-surface-800" value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Description</label>
              <textarea className="glass-input min-h-[120px] resize-y" placeholder="Describe your product..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <button type="submit" disabled={loading} className="btn-glass w-full text-lg">
              {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
