/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        signal: {
          clarity: 'var(--color-signal-clarity)',
          uncertainty: 'var(--color-signal-uncertainty)',
          engagement: 'var(--color-signal-engagement)',
          friction: 'var(--color-signal-friction)',
          alignment: 'var(--color-signal-alignment)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-playfair-display)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'signal-flow': 'signalFlow 2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        signalFlow: {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scaleX(1)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, var(--color-accent), #fcd34d)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          background: 'linear-gradient(135deg, var(--color-accent), #fcd34d)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      })
    },
  ],
}
