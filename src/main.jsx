import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Código para gestionar la instalación de la PWA
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  // Previene que Chrome muestre la instalación automáticamente
  e.preventDefault();
  // Guarda el evento para usarlo después
  deferredPrompt = e;
  // Muestra tu propio botón de instalación
  const installButton = document.getElementById("install-button");
  if (installButton) {
    installButton.style.display = "block";

    installButton.addEventListener("click", () => {
      // Muestra el prompt de instalación
      deferredPrompt.prompt();
      // Espera a que el usuario responda al prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuario aceptó la instalación");
        }
        // Limpia la referencia
        deferredPrompt = null;
      });
    });
  }
});
