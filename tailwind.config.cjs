const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FECE3A',
          light: '#FFF4CC',
          dark: '#EDB900',
          glow: '#FFD84F',
        },
        ink: {
          DEFAULT: '#000000',
          900: '#1F1B14',
          700: '#3D382D',
          500: '#6E695D',
          300: '#CFCBC1',
          100: '#EFEDE8',
        },
        surface: '#FAF9F7',
      },
      fontFamily: {
        sans: ['"Manrope Variable"', '"Noto Sans Armenian Variable"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: '0 1px 2px rgba(31, 27, 20, 0.06), 0 4px 16px rgba(31, 27, 20, 0.06)',
        lift: '0 8px 28px rgba(31, 27, 20, 0.14)',
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
};
