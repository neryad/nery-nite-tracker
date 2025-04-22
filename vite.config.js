import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import iconsJson from "./icons.json";

// const manifestIcons = [
//   {
//     src: "src/assets/android/android-launchericon-192-192.png",
//     sizes: "192x192",
//     type: "image/png",
//   },
//   {
//     src: "src/assets/android/android-launchericon-512-512.png",
//     sizes: "512x512",
//     type: "image/png",
//   },
// ];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "src/assets/android/android-launchericon-192-192.png",
        "src/assets/android/android-launchericon-512-512.png",
      ],
      manifest: {
        name: "Nery Nite Tracker",
        short_name: "Nery Nite",
        icons: [
          {
            src: "/android-launchericon-192-192.png", // Ruta final después del build
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff", // Recomendado agregar color de tema
        background_color: "#ffffff", // Recomendado agregar color de fondo
        display: "standalone", // Recomendado especificar el modo de visualización
        start_url: "/", // Recomendado especificar URL de inicio
      },
    }),
  ],
});
