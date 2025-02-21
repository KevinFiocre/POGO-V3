import React, { useState, useEffect, useRef } from "react";

const ambianceSounds = {
  Pluie: "https://example.com/pluie.mp3",
  Forêt: "https://example.com/foret.mp3",
  Ville: "https://example.com/ville.mp3",
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [ambiance, setAmbiance] = useState("Pluie");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://pogo-v3.onrender.com/api/search?q=${query}`
      );
      const data = await response.json();
      if (data.data) {
        setResults(data.data.slice(0, 5));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Erreur API :", error);
      setResults([]);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center py-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">🎵 POGO Soundscape</h1>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          className="p-2 rounded-md text-black"
          placeholder="Rechercher un artiste..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
        >
          Rechercher
        </button>
      </div>

      <ul className="space-y-4">
        {results.map((track, index) => (
          <li key={index} className="flex items-center space-x-4">
            <img
              src={track.album.cover_medium}
              alt={track.title}
              className="w-16 h-16 rounded-lg"
            />
            <span className="text-lg">🎶 {track.title} - {track.artist.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <label className="mr-2">Choisissez un son d'ambiance :</label>
        <select
          value={ambiance}
          onChange={(e) => setAmbiance(e.target.value)}
          className="p-2 rounded-md text-black"
        >
          {Object.keys(ambianceSounds).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={togglePlay}
        className="mt-4 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md"
      >
        {isPlaying ? "⏸️ Stop Ambiance" : "▶️ Jouer Ambiance"}
      </button>

      <audio ref={audioRef} src={ambianceSounds[ambiance]} loop />
    </div>
  );
};

export default Search;