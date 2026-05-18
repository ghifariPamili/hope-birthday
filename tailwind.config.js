/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF9F6',
        'rose-gold': '#E0A96D',
        sage: '#9A9B73',
        terracotta: '#C38D9E',
        warm: {
          50: '#FBF8F4',
          100: '#F5EDE3',
          200: '#E8D5C3',
          300: '#D4B89E',
          400: '#C38D9E',
          500: '#9A9B73',
          600: '#E0A96D',
          700: '#8B7B6E',
          800: '#5C4F42',
          900: '#4A3F35',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      }
    },
  },
  plugins: [],
}