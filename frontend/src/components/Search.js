import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
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

  const playTrack = (track) => {
    if (currentTrack === track.preview && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track.preview);
      audioRef.current.src = track.preview;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10 font-sans">
      {/* Barre de Recherche */}
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

      {/* Liste des musiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((track, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg flex flex-col items-center"
          >
            <img
              src={track.album.cover_medium}
              alt={track.title}
              className="w-32 h-32 rounded-lg mb-4"
            />
            <p className="text-lg font-bold">{track.title}</p>
            <p className="text-sm text-gray-400">{track.artist.name}</p>
            <button
              onClick={() => playTrack(track)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <FontAwesomeIcon icon={currentTrack === track.preview && isPlaying ? faPause : faPlay} />
            </button>
          </div>
        ))}
      </div>

      {/* Lecteur Audio */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default Search;