import js from "@eslint/js";
import globals from "globals";
import markdown from "@eslint/markdown";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
  globalIgnores([
    ".yarn/",
    ".pnp.cjs",
    ".pnp.loader.mjs",
    "node_modules/",
    "public/",
    "build/",
    "dist/",
    ".agents/",
    ".husky/",
    "docs/.vitepress/cache/",
    "docs/.vitepress/dist/",
    "skills-lock.json",
  ]),
  eslintPluginPrettierRecommended,
]);
