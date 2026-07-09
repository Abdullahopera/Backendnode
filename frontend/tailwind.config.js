/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f3f1ff', 100: '#ebe5ff', 200: '#d9ceff', 300: '#bea6ff', 400: '#9f75ff', 500: '#843dff', 600: '#7c22ff', 700: '#6d16e8', 800: '#5b13c2', 900: '#4c109e' },
        accent: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f' },
        surface: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
      },
      animation: {
        'aurora-1': 'aurora-1 25s ease-in-out infinite alternate',
        'aurora-2': 'aurora-2 30s ease-in-out infinite alternate',
        'aurora-3': 'aurora-3 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        'aurora-1': { '0%': { transform: 'translate(0, 0) scale(1)' }, '100%': { transform: 'translate(100px, -50px) scale(1.1)' } },
        'aurora-2': { '0%': { transform: 'translate(0, 0) scale(1.1)' }, '100%': { transform: 'translate(-80px, 60px) scale(1)' } },
        'aurora-3': { '0%': { transform: 'translate(0, 0) scale(1)' }, '100%': { transform: 'translate(60px, 80px) scale(1.2)' } },
        'float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'slide-in': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};
