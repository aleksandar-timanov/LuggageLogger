/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            backgroundImage: {
                'hero-pattern':
                    'url(/assets/vector-elegant-blue-wavy-pattern-background.jpg)',
            },
        },
    },
    plugins: [],
}
