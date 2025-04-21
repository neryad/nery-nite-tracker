import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import neryTrackerLogo from "./assets/logo.png";
import viteLogo from "/vite.svg";

import { Button, Input, Card, ProgressBar } from "pixel-retroui";
function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const envFile = import.meta.env.VITE_ENV_FILE;
  // const [count, setCount] = useState(0);

  //const [data, setData] = useState({});

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const progressIntervalRef = useRef(null);
  const [hasSearched, setHasSearched] = useState(false);
  function escalarValor(value, originalMax, newMax) {
    return (value / originalMax) * newMax;
  }
  const stats = data?.data?.stats?.all?.overall;
  const accountInfo = data?.data?.account;
  const battlePass = data?.data?.battlePass;
  const battlePassLevel = battlePass?.level || 0;
  const maxBattlePassLevel = 200;
  const battlePassProgress = escalarValor(
    battlePassLevel,
    maxBattlePassLevel,
    100
  );

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const fetchPlayerData = (playerName) => {
    setLoading(true);
    setHasSearched(true);
    startLoadingAnimation();
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    };
    fetch(`${apiUrl}?name=${playerName}&lang=es`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw {
            status: response.status,
            errorData: response.json(),
          };
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        completeLoadingAnimation(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        // Handle specific error codes
        if (error.status === 403) {
          setError("Las estadísticas de este jugador son privadas.");
        } else if (error.status === 404) {
          setError("Jugador no encontrado. Verifica el nombre de usuario.");
        } else if (error.status === 400) {
          setError("Solicitud incorrecta. Verifica el nombre de usuario.");
        } else if (error.errorData?.error) {
          // Use the error message from the API if available
          setError(error.errorData.error);
        } else {
          // Generic error message
          setError("Ocurrió un error al cargar los datos. Intenta nuevamente.");
        }

        completeLoadingAnimation(false);
      });
  };

  // useEffect(() => {
  //   fetchPlayerData("neryad01");
  // }, []);

  const handleSearch = () => {
    if (username.trim() === "") {
      alert("Por favor, ingresa un nombre de usuario.");
      return;
    }
    fetchPlayerData(username);
  };

  // Función para iniciar la animación de carga
  const startLoadingAnimation = () => {
    // Reiniciamos el progreso
    setLoadingProgress(0);

    // Limpiamos cualquier intervalo existente
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Creamos un nuevo intervalo que incrementa el progreso gradualmente
    progressIntervalRef.current = setInterval(() => {
      setLoadingProgress((prev) => {
        // Aumentamos gradualmente, pero nunca llegamos al 100% hasta que la petición termine
        // Esto da la sensación de que la barra se mueve mientras espera
        if (prev < 90) {
          // Aumenta más rápido al principio y más lento al acercarse al 90%
          const increment = (90 - prev) / 10;
          return prev + Math.max(0.5, increment);
        }
        return prev;
      });
    }, 150); // Actualiza cada 150ms
  };

  // Función para detener la animación de carga y completarla
  const completeLoadingAnimation = (success) => {
    // Limpiamos el intervalo
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Si la carga fue exitosa, llevamos la barra al 100%
    if (success) {
      setLoadingProgress(100);
      // Después de un breve momento, ocultamos el loader
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      // Si hubo un error, también ocultamos el loader pero sin completar la barra
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-10 flex items-center justify-center">
        <img
          src={neryTrackerLogo}
          alt="Logo React"
          className="h-12 mr-4"
          style={{ width: "100px", height: "100px" }}
        />
        <h1
          className="text-5xl font-bold mb-2 text-primary-content"
          style={{ fontSize: "2.5em" }}
        >
          <span className="text-primary">Nery</span>
          <span className="text-accent">Nite</span> Tracker
        </h1>
      </div>
      <p className="text-lg opacity-70 text-base-content flex items-center justify-center">
        Estadísticas de Fortnite a lo retro
      </p>

      {/* <div className="container mx-auto px-4 py-8">
        <img
          src={neryTrackerLogo}
          alt="Logo React"
          className="h-12 mr-4"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="text-center mb-10">
          <h1
            className="text-5xl font-bold mb-2 text-primary-content"
            style={{ fontSize: "2.5em" }}
          >
            <span className="text-primary">Nery</span>
            <span className="text-accent">Nite</span> Tracker
          </h1>
          <p className="text-lg opacity-70 text-base-content">
            Estadísticas de Fortnite a lo retro
          </p>
        </div>
      </div> */}
      <Card
        className="card bg-base-100 shadow-xl mb-6"
        style={{ marginBottom: "2.2rem" }}
      >
        <div className="card-body p-6">
          <h2 className="card-title text-xl mb-1">🎮 Buscar Jugador</h2>
          <p className="opacity-60 text-sm mb-4">
            Ingresá un nombre de jugador y consultá sus estadísticas
          </p>
          <div className="join w-full">
            <Input
              className="input input-bordered join-item text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ej: Ninja"
            />

            <Button
              bg="white"
              textColor="black"
              borderColor="black"
              shadow="black"
              className="btn btn-primary join-item"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
        </div>
      </Card>

      {/* 
      <Card
        className="card bg-base-100 shadow-xl mb-12"
        style={{ marginBottom: "3rem" }}
      >
        <div className="card-body p-6">
          <h2 className="card-title text-xl mb-4">Buscar Jugador</h2>
          <div className="join w-full">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre del jugador (ej: Ninja)"
            />

            <Button
              bg="white"
              textColor="black"
              borderColor="black"
              shadow="black"
              className="btn btn-primary join-item"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
        </div>
      </Card> */}
      {loading && hasSearched ? (
        <Card className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body p-6 text-center">
            <h2 className="text-xl mb-4">Cargando datos...</h2>
            <ProgressBar
              color="purple"
              progress={loadingProgress.toFixed(0)}
              max="100"
              className="loading"
            ></ProgressBar>
            <p className="mt-2 text-sm opacity-70">
              {loadingProgress < 100
                ? "Obteniendo estadísticas del jugador..."
                : "Completado!"}
            </p>
          </div>
        </Card>
      ) : !hasSearched ? (
        <Card className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Interface-Essential-Search-Binocular--Streamline-Pixel"
              height="80"
              width="80"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4"
            >
              <desc>
                Interface Essential Search Binocular Streamline Icon:
                https://streamlinehq.com
              </desc>
              <title>interface-essential-search-binocular</title>
              <g>
                <path
                  d="M22.8525 14.283750000000001H24v4.5675h-1.1475Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M21.7125 18.85125h1.1400000000000001v1.1475h-1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m20.572499999999998 11.99625 0 1.1475 1.1400000000000001 0 0 1.1400000000000001 1.1400000000000001 0 0 -4.574999999999999 -1.1400000000000001 0 0 2.2874999999999996 -1.1400000000000001 0z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M20.572499999999998 19.99875h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M20.572499999999998 6.28125h1.1400000000000001v3.4275h-1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m20.572499999999998 13.143749999999999 -4.574999999999999 0 0 1.1400000000000001 3.4275 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1475 -1.1475 0 0 1.1400000000000001 -1.1400000000000001 0 0 -3.4275 -1.1400000000000001 0 0 4.5675 1.1400000000000001 0 0 1.1475 4.574999999999999 0 0 -1.1475 1.1400000000000001 0 0 -4.5675 -1.1400000000000001 0 0 -1.1400000000000001z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M19.424999999999997 2.8537500000000002h1.1475v3.4275H19.424999999999997Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M15.997499999999999 21.138749999999998h4.574999999999999v1.1475h-4.574999999999999Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M15.997499999999999 10.85625h4.574999999999999v1.1400000000000001h-4.574999999999999Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M14.857499999999998 19.99875h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M14.857499999999998 11.99625h1.1400000000000001v1.1475h-1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M13.71 1.71375h5.715v1.1400000000000001h-5.715Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M13.71 18.85125h1.1475v1.1475h-1.1475Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m13.71 14.283750000000001 1.1475 0 0 -1.1400000000000001 -2.2874999999999996 0 0 5.7075000000000005 1.1400000000000001 0 0 -4.5675z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m14.857499999999998 8.568750000000001 -1.1475 0 0 -1.1400000000000001 -3.4275 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1400000000000001 1.1400000000000001 0 0 1.1475 3.4275 0 0 -1.1475 1.1475 0 0 -1.1400000000000001z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M11.43 11.99625h1.1400000000000001v1.1475h-1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m10.2825 6.28125 3.4275 0 0 -3.4275 -1.1400000000000001 0 0 2.2874999999999996 -1.1400000000000001 0 0 -2.2874999999999996 -1.1475 0 0 3.4275z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M9.1425 18.85125h1.1400000000000001v1.1475h-1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m9.1425 14.283750000000001 1.1400000000000001 0 0 4.5675 1.1475 0 0 -5.7075000000000005 -2.2874999999999996 0 0 1.1400000000000001z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M7.995 19.99875h1.1475v1.1400000000000001h-1.1475Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M7.995 11.99625h1.1475v1.1475h-1.1475Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m7.995 13.143749999999999 -4.5675 0 0 1.1400000000000001 3.4275 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1475 -1.1475 0 0 1.1400000000000001 -1.1400000000000001 0 0 -3.4275 -1.1400000000000001 0 0 4.5675 1.1400000000000001 0 0 1.1475 4.5675 0 0 -1.1475 1.1475 0 0 -4.5675 -1.1475 0 0 -1.1400000000000001z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M3.4275 21.138749999999998h4.5675v1.1475H3.4275Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M4.5675 1.71375h5.715v1.1400000000000001H4.5675Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M3.4275 10.85625h4.5675v1.1400000000000001H3.4275Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M3.4275 2.8537500000000002h1.1400000000000001v3.4275H3.4275Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M2.2874999999999996 19.99875h1.1400000000000001v1.1400000000000001H2.2874999999999996Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M2.2874999999999996 6.28125h1.1400000000000001v3.4275H2.2874999999999996Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M1.1400000000000001 18.85125h1.1475v1.1475H1.1400000000000001Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="m2.2874999999999996 13.143749999999999 1.1400000000000001 0 0 -1.1475 -1.1400000000000001 0 0 -2.2874999999999996 -1.1475 0 0 4.574999999999999 1.1475 0 0 -1.1400000000000001z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
                <path
                  d="M0 14.283750000000001h1.1400000000000001v4.5675H0Z"
                  fill="#000000"
                  strokeWidth="0.75"
                ></path>
              </g>
            </svg>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 opacity-60"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg> */}
            <h2 className="text-2xl font-bold mb-2">
              ¡Busca a tu jugador favorito!
            </h2>
            <p className="text-lg opacity-70 mb-4">
              Escribe el nombre de usuario de un jugador de Fortnite en el campo
              de búsqueda y haz clic en "Buscar" para ver sus estadísticas.
            </p>
            <p className="text-lg opacity-70 mb-4">
              El jugador debe tener su cuenta <strong>pública</strong> para que
              puedas ver sus estadísticas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-3 bg-base-200">
                <div className="text-center">
                  <h3 className="font-bold">Victorias</h3>
                  <p className="opacity-70">
                    Descubre cuántas partidas ha ganado el jugador
                  </p>
                </div>
              </Card>
              <Card className="p-3 bg-base-200">
                <div className="text-center">
                  <h3 className="font-bold">Estadísticas K/D</h3>
                  <p className="opacity-70">
                    Ratio de eliminaciones por muerte
                  </p>
                </div>
              </Card>
              <Card className="p-3 bg-base-200">
                <div className="text-center">
                  <h3 className="font-bold">Pase de batalla</h3>
                  <p className="opacity-70">Nivel actual y progreso</p>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      ) : error ? (
        <Card className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body p-6 text-center text-error">
            <h2 className="text-xl mb-4">Error al cargar datos</h2>
            <p>{error}</p>
            <Button
              className="btn btn-outline btn-error mt-4"
              onClick={() => {
                setError(null);
                setHasSearched(false);
              }}
            >
              Volver a buscar
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="card bg-base-100 shadow-xl mb-8 overflow-hidden">
          <div className="profile-header p-6 text-white">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-bold">
                  {accountInfo?.name || "N/A"}
                </h2>
                <p className="opacity-80">ID: {accountInfo?.id || "N/A"}</p>
              </div>

              <Button className="btn btn-sm btn-warning gap-2 favorite-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Favorito
              </Button>
            </div>
          </div>

          <div className="card-body p-6 pt-0">
            <div className="bg-base-200 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Battle Pass</h3>
                <span className="badge badge-primary">
                  Nivel {battlePass?.level || 0}
                </span>
              </div>
              <ProgressBar
                color="purple"
                progress={battlePassProgress.toFixed(1)}
                max="200"
              ></ProgressBar>
              <div className="text-right text-xs opacity-70 mt-1">
                Última actualización: {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="tabs game-mode-tabs mb-6 overflow-x-auto">
              <a className="tab tab-bordered tab-active">General</a>
              <a className="tab tab-bordered">Solo</a>
              <a className="tab tab-bordered">Duos</a>
              <a className="tab tab-bordered">Escuadrones</a>
              <a className="tab tab-bordered">LTM</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="stat-container card bg-base-200 hover:shadow-lg transition-all">
                <div className="card-body p-4">
                  <h3 className="text-lg font-semibold opacity-70">
                    Victorias
                  </h3>
                  <div className="text-4xl font-bold text-primary ">
                    {stats?.wins}
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span>Win Rate</span>
                      <span>
                        {stats?.winRate ? stats.winRate.toFixed(2) : "0"}%
                      </span>
                    </div>
                    <ProgressBar
                      color="#6e0b75"
                      size="md"
                      className="progress progress-primary w-full"
                      progress={stats?.winRate || "0"}
                      max="100"
                    ></ProgressBar>
                  </div>
                </div>
              </Card>
              <Card className="stat-container card bg-base-200 hover:shadow-lg transition-all">
                <div className="card-body p-4">
                  <h3 className="text-lg font-semibold opacity-70">
                    K/D Ratio
                  </h3>
                  <div className="text-4xl font-bold text-secondary">
                    {stats?.kd ? stats.kd.toFixed(2) : "0"}
                  </div>
                  <div className="stats stats-vertical shadow mt-2 bg-transparent">
                    <Card className="stat py-1 px-0">
                      <div className="stat-title">Eliminaciones</div>
                      <div className="stat-value text-lg">
                        {stats?.kills || "0"}
                      </div>
                    </Card>
                    <br />
                    <Card className="stat py-1 px-0">
                      <div className="stat-title">Muertes</div>
                      <div className="stat-value text-lg">
                        {stats?.deaths || "0"}
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
              <Card className="stat-container card bg-base-200 hover:shadow-lg transition-all">
                <div className="card-body p-4">
                  <h3 className="text-lg font-semibold opacity-70">Partidas</h3>
                  <div className="text-4xl font-bold text-accent">
                    {stats?.matches || "0"}
                  </div>
                  <Card className="stats stats-vertical shadow mt-2 bg-transparent">
                    <div className="stat py-1 px-0">
                      <div className="stat-title">Tiempo jugado</div>
                      <div className="stat-value text-lg">
                        {" "}
                        {stats?.minutesPlayed
                          ? `${Math.floor(stats.minutesPlayed / 60)}h ${
                              stats.minutesPlayed % 60
                            }m`
                          : "0h 0m"}
                      </div>
                    </div>
                    <div className="stat py-1 px-0">
                      <div className="stat-title">Score/Partida</div>
                      <div className="stat-value text-lg">
                        {" "}
                        {stats?.scorePerMatch
                          ? stats.scorePerMatch.toFixed(2)
                          : "0"}
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>

              <Card className="stat-container card bg-base-200 hover:shadow-lg transition-all">
                <div className="card-body p-4">
                  <h3 className="text-lg font-semibold opacity-70">
                    Top Posiciones
                  </h3>
                  <div className="flex items-end gap-2">
                    <div className="text-4xl font-bold text-info">
                      {stats?.top3 || "0"}
                    </div>
                    <div className="opacity-70">Top 3</div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Card className="badge badge-lg">
                      Top 10: {stats?.top10 || "0"}
                    </Card>
                    <Card className="badge badge-lg">
                      Top 25: {stats?.top25 || "0"}
                    </Card>
                  </div>
                </div>
              </Card>
              <Card className="stat-container card bg-base-200 hover:shadow-lg transition-all">
                <div className="card-body p-4">
                  <h3 className="text-lg font-semibold opacity-70">
                    Score Total
                  </h3>
                  <div className="text-4xl font-bold text-success">
                    {stats?.score || "0"}
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-sm">
                    <div>
                      Score/Min:{" "}
                      <span className="font-bold">
                        {stats?.scorePerMin
                          ? stats.scorePerMin.toFixed(2)
                          : "0"}
                      </span>
                    </div>
                    <div>
                      Players Outlived:{" "}
                      <span className="font-bold">
                        {stats?.playersOutlived || "0"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="stat-container card bg-base-200 hover:shadow-lg transition-all">
                <div className="card-body p-4">
                  <h3 className="text-lg font-semibold opacity-70">
                    Dispositivos
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra table-sm">
                      <tbody>
                        <tr>
                          <td>Mando</td>
                          <td className="text-right font-bold">
                            {" "}
                            {data?.data?.stats?.gamepad?.overall?.wins ||
                              "0"}{" "}
                            victorias
                          </td>
                        </tr>
                        <tr>
                          <td>Teclado</td>
                          <td className="text-right font-bold">
                            {data?.data?.stats?.keyboardMouse?.overall?.wins ||
                              "0"}{" "}
                            victorias
                          </td>
                        </tr>
                        <tr>
                          <td>Táctil</td>
                          <td className="text-right font-bold">
                            {" "}
                            {data?.data?.stats?.touch?.overall?.wins ||
                              "0"}{" "}
                            victorias
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      )}

      {/* <footer className="text-center opacity-70 mt-10 text-base-content">
        <p>
          NeryNite Tracker © 2025 | Datos actualizados:{" "}
          {new Date().toLocaleDateString()}
        </p>
      </footer> */}
      <footer className="text-center opacity-70 mt-10 text-base-content">
        <p>
          NeryNite Tracker © 2025 | Datos actualizados:{" "}
          {new Date().toLocaleDateString()}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          {/* Redes Sociales */}
          <a
            href="https://www.twitter.com/neryadg"
            target="_blank"
            className="text-blue-500 hover:text-blue-700"
          >
            Twitter
          </a>
          <a
            href="https://github.com/neryad"
            target="_blank"
            className="text-gray-800 hover:text-gray-600"
          >
            GitHub
          </a>
          <a
            href="https://www.youtube.com/@neryad"
            target="_blank"
            className="text-pink-500 hover:text-pink-700"
          >
            Youtube
          </a>
          <a
            href="https://github.com/neryad/nery-nite-tracker.git"
            target="_blank"
            className="text-pink-500 hover:text-pink-700"
          >
            Repo
          </a>
        </div>
        <div className="mt-4">
          <Button
            bg="yellow"
            textColor="black"
            borderColor="black"
            shadow="black"
            className="btn btn-sm"
            onClick={() => window.open("https://ko-fi.com/neryad", "_blank")}
          >
            <span className="mr-2">☕</span>
            Apoya este proyecto
          </Button>
        </div>
        <div className="mt-2">
          <p>Versión 0.1.0</p>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Hecho con ❤️ y react por Neryad</p>
        </div>
      </footer>
    </>
  );
}

export default App;
