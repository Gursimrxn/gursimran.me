const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            fontFamily: {
                sans: ['var(--font-urbane)', ...fontFamily.sans],
                urbane: ['Urbane', ...fontFamily.sans],
                productsans: ['var(--font-productsans)', ...fontFamily.sans],
            },
        },
    },
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ]
}