const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    theme: {
        fontFamily: {
            urbane: ['var(--font-urbane)', ...fontFamily.sans],
            product: ['var(--font-product)', ...fontFamily.sans],
        },
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
        },
    },
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ]
}