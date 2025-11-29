import { useState, useRef } from "react";
import { Card, Button, ProgressBar } from "pixel-retroui";
import html2canvas from "html2canvas";
import ShareCard from "./ShareCard";

const ShareModal = ({ player, stats, battlePass, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const shareCardRef = useRef(null);

  const generateImage = async () => {
    setLoading(true);
    try {
      const element = document.getElementById("share-card-element");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 1, // Use 1 for exact 1200x630 dimensions
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      setGeneratedImage(image);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error al generar la imagen. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `nery-nite-${player.name}-stats.png`;
    link.click();
  };

  const shareUrl = window.location.origin + `?player=${player.name}`;
  const shareText = `¡Mira mis stats de Fortnite en NeryNite Tracker! 🎮\n🏆 Wins: ${stats?.wins}\n⚔️ K/D: ${stats?.kd?.toFixed(2)}\n📊 Nivel: ${battlePass?.level}\n\n${shareUrl}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copiado al portapapeles!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Hidden ShareCard for generation */}
      <ShareCard 
        id="share-card-element" 
        player={player} 
        stats={stats} 
        battlePass={battlePass} 
      />

      <Card className="w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📤 Compartir Estadísticas</h2>
            <Button
              bg="red"
              textColor="white"
              borderColor="black"
              shadow="black"
              className="btn btn-sm"
              onClick={onClose}
            >
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preview Section */}
            <div className="flex flex-col items-center justify-center bg-base-200 p-4 rounded-lg min-h-[200px]">
              {loading ? (
                <div className="text-center">
                  <p className="mb-2">Generando imagen...</p>
                  <ProgressBar color="purple" progress={80} className="w-32" />
                </div>
              ) : generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Stats Preview" 
                  className="w-full rounded shadow-lg border-2 border-base-300"
                />
              ) : (
                <div className="text-center opacity-60">
                  <p>Genera una imagen para compartir</p>
                  <Button 
                    bg="purple" 
                    textColor="white" 
                    className="mt-4"
                    onClick={generateImage}
                  >
                    📸 Generar Preview
                  </Button>
                </div>
              )}
            </div>

            {/* Actions Section */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold opacity-80">Opciones de Compartir</h3>
              
              <Button
                bg="blue"
                textColor="white"
                borderColor="black"
                className="btn w-full justify-start gap-2"
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')}
              >
                🐦 Twitter / X
              </Button>

              <Button
                bg="navy"
                textColor="white"
                borderColor="black"
                className="btn w-full justify-start gap-2"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
              >
                📘 Facebook
              </Button>

              <Button
                bg="green"
                textColor="white"
                borderColor="black"
                className="btn w-full justify-start gap-2"
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
              >
                💬 WhatsApp
              </Button>

              <div className="divider my-1"></div>

              <div className="join w-full">
                <input 
                  type="text" 
                  value={shareUrl} 
                  readOnly 
                  className="input input-bordered join-item w-full text-sm"
                />
                <Button
                  bg="gray"
                  textColor="white"
                  className="join-item"
                  onClick={copyLink}
                >
                  📋
                </Button>
              </div>

              {generatedImage && (
                <Button
                  bg="yellow"
                  textColor="black"
                  borderColor="black"
                  className="btn w-full mt-2 gap-2"
                  onClick={downloadImage}
                >
                  ⬇️ Descargar Imagen
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShareModal;
