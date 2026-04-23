import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://shobon03.github.io",
	base: "/portfolio",
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		domains: ["avatars.githubusercontent.com", "github.com"],
	},
});
