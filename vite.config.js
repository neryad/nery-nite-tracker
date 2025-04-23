import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto", // Añade esta línea
      includeAssets: [
        "android/android-launchericon-192-192.png",
        "android/android-launchericon-512-512.png",
        "favicon.ico",
      ],
      manifest: {
        name: "Nery Nite Tracker",
        short_name: "Nery Nite",
        description: "Aplicación para seguimiento Nery Nite",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true, // Habilita PWA en desarrollo (opcional)
      },
    }),
  ],
});
