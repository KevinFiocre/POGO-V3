import React, { useState } from "react";

const Search = ({ onMusicSelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://pogo-v3.onrender.com/api/search?q=${query}`);
            const data = await response.json();
            if (data && data.data) {
                setResults(data.data.slice(0, 5)); // ✅ Affiche 5 résultats max
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error("Erreur API :", error);
            setResults([]);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white py-6 px-4 sm:px-8">
            <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl">🎵 POGO Soundscape</h1>

            {/* Barre de recherche */}
            <div className="w-full max-w-xs sm:max-w-md flex items-center gap-2">
                <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                    placeholder="Rechercher un artiste..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-purple-500 hover:bg-purple-700 text-white p-3 rounded-lg"
                >
                    🔍
                </button>
            </div>

            {/* Liste des résultats */}
            <ul className="w-full max-w-xs sm:max-w-md mt-4 space-y-4">
                {results.length > 0 ? (
                    results.map((track) => (
                        <li
                            key={track.id}
                            className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition"
                            onClick={() => onMusicSelect(track)}
                        >
                            <img
                                src={track.album.cover_medium}
                                alt={track.title}
                                className="w-14 h-14 rounded-lg"
                            />
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">{track.title}</p>
                                <p className="text-gray-400">{track.artist.name}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-400 mt-4 text-center">Aucun résultat trouvé.</p>
                )}
            </ul>
        </div>
    );
};

export default Search;