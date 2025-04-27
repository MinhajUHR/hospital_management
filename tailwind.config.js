/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient': 'backgroundShift 6s infinite alternate',
        'glow': 'glow 1.5s infinite alternate',
        'float-1': 'float 4s infinite ease-in-out',
        'float-2': 'float 6s infinite ease-in-out',
        'float-3': 'float 5s infinite ease-in-out',
        'float-4': 'float 7s infinite ease-in-out',
      },
      keyframes: {
        backgroundShift: {
          '0%': { background: 'linear-gradient(90deg, #27263b, #776BCC)' },
          '50%': { background: 'linear-gradient(90deg, #1a1a2e, #5338b8)' },
          '100%': { background: 'linear-gradient(90deg, #27263b, #776BCC)' },
        },
        glow: {
          'from': { textShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)' },
          'to': { textShadow: '0px 0px 30px rgba(255, 255, 255, 1)' },
        },
        float: {
          '0%': { transform: 'translateY(0px) rotate(45deg)' },
          '50%': { transform: 'translateY(-20px) rotate(45deg)' },
          '100%': { transform: 'translateY(0px) rotate(45deg)' },
        },
      },
    },
  },
  plugins: [],
};