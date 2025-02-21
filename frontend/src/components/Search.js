import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlay } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onMusicSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`https://pogo-v3.onrender.com/api/search?q=${query}`);
      const data = await response.json();
      setResults(data.data ? data.data.slice(0, 5) : []);
    } catch (error) {
      console.error("Erreur API :", error);
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">SoundScape</h1>

      {/* Barre de recherche */}
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          className="p-3 w-full max-w-md rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="Rechercher un artiste..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="ml-3 text-purple-400">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </button>
      </div>

      {/* Résultats */}
      {results.length > 0 && (
        <div className="mt-4 space-y-4">
          {results.map((track, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition"
              onClick={() => onMusicSelect(track)}
            >
              <img src={track.album.cover_medium} alt={track.title} className="w-16 h-16 rounded-lg" />
              <div className="ml-4">
                <p className="text-lg font-semibold">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist.name}</p>
              </div>
              <FontAwesomeIcon icon={faPlay} className="text-purple-400 ml-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;