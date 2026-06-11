import js from "@eslint/js";
import globals from "globals";
import markdown from "@eslint/markdown";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";

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
    ".agents/",
    ".husky/",
    ".yarn/",
    "docs/.vitepress/cache/",
    "docs/.vitepress/dist/",
    "docs/public/",
    "node_modules/",
    ".pnp.cjs",
    ".pnp.loader.mjs",
    "skills-lock.json",
  ]),
  eslintPluginPrettierRecommended,
  pluginVue.configs["flat/recommended"],
]);
