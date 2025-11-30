import { useState, useEffect } from "react";
import { Button } from "pixel-retroui";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <Button
      bg="pink"
      textColor="black"
      borderColor="black"
      shadow="black"
      className="btn btn-sm gap-2 animate-bounce"
      onClick={onClick}
      title="Instalar Aplicación"
    >
      <span className="text-lg">📲</span>
      <span className="hidden sm:inline">Instalar App</span>
    </Button>
  );
};

export default InstallPWA;
