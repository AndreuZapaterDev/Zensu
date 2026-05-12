export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pastel-green': '#D9F2D8',
        'pastel-lime': '#E8F7C8',
        'pastel-cyan': '#C9EFF6',
        'pastel-sky': '#D3E9FF',
        'pastel-purple': '#E9D6FF',
        'pastel-orange': '#FFE2C2',
        'pastel-rose': '#FFD8E4',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
