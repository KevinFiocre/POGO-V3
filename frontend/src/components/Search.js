import React, { useState } from "react";

const Search = ({ onMusicSelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

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

            if (data && data.data) {
                setResults(data.data.slice(0, 5)); // ✅ Affiche 5 résultats max
            } else {
                setResults([]); // ✅ Gère le cas où aucun résultat n'est trouvé
            }
        } catch (error) {
            console.error("Erreur API :", error);
            setResults([]);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white py-10">
            <h1 className="text-3xl font-bold mb-6">SoundScape</h1>

            {/* Barre de recherche */}
            <div className="relative flex items-center justify-center mb-6">
                <input
                    type="text"
                    className="p-2 w-80 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                    placeholder="Rechercher un artiste..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-lg"
                >
                    🔍
                </button>
            </div>

            {/* Liste des résultats */}
            <ul className="w-96 space-y-4">
                {results.length > 0 ? (
                    results.map((track) => (
                        <li
                            key={track.id}
                            className="flex items-center p-3 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition"
                            onClick={() => onMusicSelect(track)}
                        >
                            <img
                                src={track.album.cover_medium}
                                alt={track.title}
                                className="w-16 h-16 rounded-lg mr-4"
                            />
                            <div>
                                <p className="text-lg font-bold">{track.title}</p>
                                <p className="text-gray-400">{track.artist.name}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-400">Aucun résultat trouvé.</p>
                )}
            </ul>
        </div>
    );
};

export default Search;