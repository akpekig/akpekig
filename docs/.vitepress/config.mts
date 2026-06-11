import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Gabriel Duraye",
  description: "Software Engineer | Cloud · Web · Mobile",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Case Studies", link: "/case-studies/" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/case-studies/": [
        {
          text: "Case Studies",
          items: [
            { text: "Overview", link: "/case-studies/" },
            { text: "Navy", link: "/case-studies/navy" },
            { text: "Orlie Mobile", link: "/case-studies/orlie-mobile" },
            { text: "Partner Tool", link: "/case-studies/partner-tool" },
            { text: "Neuromancers", link: "/case-studies/neuromancers" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/baldwinboy" }],
  },

  markdown: {
    theme: {
      light: "everforest-light",
      dark: "tokyo-night",
    },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/SwitchAppearance.vue", import.meta.url),
          ),
        },
      ],
    },
  },
});
