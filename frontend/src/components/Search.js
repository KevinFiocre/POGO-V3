import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [balance, setBalance] = useState(0);
  const [selectedAmbiance, setSelectedAmbiance] = useState(null);
  const audioRef = useRef(null);

  const handleSearch = async () => {
    try {
      console.log("Recherche envoyée :", query);
      const response = await fetch(`https://pogo-v3.onrender.com/api/search?q=${query}`);
      console.log("Réponse brute de l'API :", response);

      if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`);
      }

      const data = await response.json();
      console.log("Données reçues :", data);

      if (data.data) {
        setResults(data.data.slice(0, 5)); // Afficher 5 résultats
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Erreur API :", error);
      setResults([]);
    }
  };

  const playTrack = (track) => {
    if (currentTrack === track.preview && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track.preview);
      audioRef.current.src = track.preview;
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4">SoundScape</h1>

        {/* Barre de recherche */}
        <div className="relative flex items-center justify-center mb-4">
          <input
            type="text"
            className="p-2 w-full rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
            placeholder="Rechercher un artiste..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 text-purple-400 hover:text-purple-600"
          >
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </div>

        {/* Résultats de la recherche */}
        {results.length > 0 && results.map((track, index) => (
          <div key={index} className="flex flex-col items-center mt-4">
            <img
              src={track.album.cover_medium}
              alt={track.title}
              className="w-64 h-64 rounded-lg shadow-md mb-4"
            />
            <p className="text-xl font-bold">{track.title}</p>
            <p className="text-gray-400">{track.artist.name}</p>

            {/* Bouton Play/Pause */}
            <button
              onClick={() => playTrack(track)}
              className="mt-4 bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300"
            >
              <FontAwesomeIcon icon={currentTrack === track.preview && isPlaying ? faPause : faPlay} />
            </button>

            {/* Volume et Balance */}
            <div className="mt-4 w-full text-left">
              <p className="text-sm font-semibold">Volume principal : {Math.round(volume * 100)}%</p>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => {
                  setVolume(e.target.value);
                  if (audioRef.current) audioRef.current.volume = e.target.value;
                }}
                className="w-full mt-1"
              />

              <p className="text-sm font-semibold mt-2">Balance (gauche/droite) : {balance}</p>
              <input 
                type="range" 
                min="-1" 
                max="1" 
                step="0.1" 
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full mt-1"
              />
            </div>

            {/* Sélection du son d'ambiance */}
            <h3 className="text-md font-semibold mt-4">Sons d'ambiance</h3>
            <div className="flex gap-4 mt-2">
              {["Pluie", "Forêt"].map((ambiance) => (
                <button
                  key={ambiance}
                  onClick={() => setSelectedAmbiance(ambiance)}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    selectedAmbiance === ambiance ? "bg-purple-600 text-white" : "bg-gray-500 text-gray-300"
                  }`}
                >
                  {ambiance}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Lecteur Audio caché */}
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      </div>
    </div>
  );
};

export default Search;