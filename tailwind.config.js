/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    1: '#fafaf9',
                    2: '#f1f5f9',
                    3: '#38bdf8',
                    4: '#8b5cf6',
                },
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
