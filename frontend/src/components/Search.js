import React, { useState } from "react";

const Search = ({ onMusicSelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://pogo-v3.onrender.com/api/search?q=${query}`);
            const data = await response.json();

            if (data && data.data) {
                // ✅ Limite à 5 résultats max
                setResults(data.data.slice(0, 5));
            } else {
                setResults([]); // ✅ Évite les erreurs si data est vide
            }
        } catch (error) {
            console.error("Erreur API :", error);
            setResults([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un artiste..."
            />
            <button onClick={handleSearch}>Rechercher</button>

            <ul>
                {results.length > 0 ? (
                    results.map((track) => (
                        <li key={track.id} onClick={() => onMusicSelect(track)}>
                            🎵 {track.title} - {track.artist.name}
                        </li>
                    ))
                ) : (
                    <p>Aucun résultat trouvé.</p>
                )}
            </ul>
        </div>
    );
};

export default Search;