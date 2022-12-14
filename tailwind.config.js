module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                600: "600px",
                "17/20": "85%",
            },
            colors: {
                slate: "#eff3f4",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}