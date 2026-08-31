/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          50: '#F2F6FB',
          100: '#E3ECF6',
          200: '#C7D8EA',
          300: '#9BB8D6',
          400: '#6A92B8',
          500: '#476F9E',
          600: '#345683',
          700: '#2A4569',
          800: '#1B2F4E',
          900: '#0B1F3A',
          950: '#07142A',
        },
        accent: {
          50: '#EEF6FF',
          100: '#D9E9FF',
          200: '#BCD7FF',
          300: '#8EBCFF',
          400: '#5A97FB',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        ink: {
          DEFAULT: '#0B1F3A',
          soft: '#3C4A63',
          muted: '#6B7589',
        },
        cream: '#FAF8F3',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 31, 58, 0.04), 0 8px 24px -12px rgba(11, 31, 58, 0.12)',
        'card-hover': '0 4px 12px rgba(11, 31, 58, 0.08), 0 24px 48px -20px rgba(11, 31, 58, 0.22)',
        drawer: '0 -4px 40px -8px rgba(11, 31, 58, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-soft': 'pulse-soft 1.4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
