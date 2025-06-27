/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-red-100',
    'bg-orange-100', 
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-purple-100',
    'text-red-600',
    'text-orange-600',
    'text-yellow-600',
    'text-green-600',
    'text-blue-600',
    'text-purple-600',
  ],
};