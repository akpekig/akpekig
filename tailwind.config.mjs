import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/*.md",
    "./docs/case-studies/**/*.md",
    "./docs/about.md",
    "./docs/.vitepress/**/*.{js,ts,vue}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["coffee", "synthwave"],
    darkTheme: "synthwave",
  },
};
