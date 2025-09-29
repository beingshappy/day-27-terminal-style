/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
      colors: {
        green: {
          400: '#4ade80',
          300: '#86efac',
          500: '#22c55e',
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        blink: {
          '0%, 50%': {
            opacity: '1',
          },
          '51%, 100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}