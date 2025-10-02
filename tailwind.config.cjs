// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}", "./node_modules/flowbite/**/*.js",
    "./public/**/*.html"
  ],
  theme: { extend: {} },
  plugins: [require("flowbite/plugin")],
};