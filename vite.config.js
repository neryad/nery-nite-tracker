import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import iconsJson from "./icons.json";
// const manifestIcons = iconsJson.icons.map((icon) => ({
//   src: `/src/assets/${icon.src}`,
//   sizes: icon.sizes,
//   type: "image/png",
// }));
// https://vite.dev/config/

const manifestIcons = [
  {
    src: "src/assets/android/android-launchericon-192-192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "src/assets/android/android-launchericon-512-512.png",
    sizes: "512x512",
    type: "image/png",
  },
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Nery Nite Tracker",
        short_name: "Nery Nite",
        icons: manifestIcons,
      },
    }),
  ],
});
