module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'accent-blue': '#2563eb',
        'accent-blue-light': '#60a5fa',
        'accent-purple': '#a21caf',
        'accent-purple-light': '#6d28d9',
        surface: '#18182f',
        'surface-alt': '#23234a',
        success: '#22c55e',
        info: '#38bdf8',
        'text-primary': '#fff',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8',
        border: '#23234a',
        'border-alt': '#3b3b5c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}; 