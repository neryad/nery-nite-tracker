import { Card, Button } from "pixel-retroui";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PlayerComparison = ({ players, onClose }) => {
  if (!players || players.length < 2) {
    return null;
  }

  // Prepare data for radar chart (normalized stats)
  const radarData = [
    {
      stat: "Wins",
      ...players.reduce((acc, player, idx) => {
        acc[`player${idx}`] = player.wins || 0;
        return acc;
      }, {}),
    },
    {
      stat: "K/D",
      ...players.reduce((acc, player, idx) => {
        acc[`player${idx}`] = (player.kd || 0) * 50; // Scale for visibility
        return acc;
      }, {}),
    },
    {
      stat: "Nivel BP",
      ...players.reduce((acc, player, idx) => {
        acc[`player${idx}`] = player.level || 0;
        return acc;
      }, {}),
    },
  ];

  // Prepare data for bar chart
  const barData = [
    {
      name: "Victorias",
      ...players.reduce((acc, player, idx) => {
        acc[player.name] = player.wins || 0;
        return acc;
      }, {}),
    },
    {
      name: "Nivel BP",
      ...players.reduce((acc, player, idx) => {
        acc[player.name] = player.level || 0;
        return acc;
      }, {}),
    },
  ];

  // Colors for each player (retro palette)
  const colors = ["#6e0b75", "#00d9ff", "#ff006e", "#ffbe0b"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start md:items-center justify-center p-2 md:p-4 overflow-y-auto">
      <Card className="w-full max-w-6xl bg-base-100 shadow-2xl my-4 md:my-8">
        <div className="card-body p-3 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-3xl font-bold">
              ⚔️ Comparación
            </h2>
            <Button
              bg="red"
              textColor="white"
              borderColor="black"
              shadow="black"
              className="btn btn-sm"
              onClick={onClose}
            >
              ✕ Cerrar
            </Button>
          </div>

          {/* Player Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {players.map((player, idx) => (
              <Card
                key={player.id}
                className="bg-base-200 p-4"
                style={{ borderColor: colors[idx], borderWidth: "3px" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors[idx] }}
                  ></div>
                  <h3 className="font-bold text-xl">{player.name}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Victorias:</span>
                    <span className="font-bold">{player.wins || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">K/D:</span>
                    <span className="font-bold">
                      {typeof player.kd === "number"
                        ? player.kd.toFixed(2)
                        : player.kd || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Nivel BP:</span>
                    <span className="font-bold">{player.level || 0}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card className="bg-base-200 p-2 md:p-4">
              <h3 className="font-bold text-lg mb-4 text-center">
                📊 Comparación General
              </h3>
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#666" />
                  <PolarAngleAxis dataKey="stat" stroke="#fff" />
                  <PolarRadiusAxis stroke="#666" />
                  {players.map((player, idx) => (
                    <Radar
                      key={idx}
                      name={player.name}
                      dataKey={`player${idx}`}
                      stroke={colors[idx]}
                      fill={colors[idx]}
                      fillOpacity={0.3}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
              </div>
            </Card>

            {/* Bar Chart */}
            <Card className="bg-base-200 p-2 md:p-4">
              <h3 className="font-bold text-lg mb-4 text-center">
                📈 Estadísticas Detalladas
              </h3>
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "2px solid #fff",
                    }}
                  />
                  <Legend />
                  {players.map((player, idx) => (
                    <Bar
                      key={idx}
                      dataKey={player.name}
                      fill={colors[idx]}
                      radius={[8, 8, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* K/D Comparison */}
          <Card className="bg-base-200 p-4 mt-6">
            <h3 className="font-bold text-lg mb-4 text-center">
              🎯 Ratio K/D Comparación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {players.map((player, idx) => (
                <div key={player.id} className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: colors[idx] }}
                  >
                    {typeof player.kd === "number"
                      ? player.kd.toFixed(2)
                      : player.kd || "0.00"}
                  </div>
                  <div className="text-sm opacity-70">{player.name}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Winner Badge */}
          <div className="text-center mt-6">
            {(() => {
              const winner = players.reduce((prev, current) =>
                (prev.wins || 0) > (current.wins || 0) ? prev : current
              );
              return (
                <div className="inline-block">
                  <div className="badge badge-lg badge-warning gap-2 p-3 md:p-4 h-auto whitespace-normal text-center">
                    <span className="text-xl md:text-2xl">🏆</span>
                    <span className="font-bold text-sm md:text-base">
                      {winner.name} lidera con {winner.wins || 0} victorias
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayerComparison;
