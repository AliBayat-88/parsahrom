import plugin from 'tailwindcss/plugin'

export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
              darkPrimary:"#B4B4C3",
                primary:"#232326"
            },
            fontFamily: {
                irancell_semibold: ['irancell', 'sans-serif'],
                moshreq_bold: ['moshreq-bold', 'sans-serif'],
                moshreq_heavy: ['moshreq-heavy', 'sans-serif'],
            }
        },
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        }),
    ],
}