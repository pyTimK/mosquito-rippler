/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // constant
        transparent: "transparent",
        current: "currentColor",
        white: "#FAFAFA",
        link: "#4D7ACC",
        text_gray: "#44577C",
        semi_transparent: "#00000022",
        smooth_black: "#262626",
        red_info: "#E74C3C",

        // required
        light_primary: "#AAF6FA",
        darker_primary: "#0B81EF",
        darkest_primary: "#0964B9",

        // custom
        light_blue: "#66DBE2",
        blue: "#0B81EF",
        red: '#C52222',
        orange: '#F27935',
        green: '#23B244',
      },
    },
    
  },
  plugins: [],
}
