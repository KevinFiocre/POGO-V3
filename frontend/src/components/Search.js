import React, { useState } from "react";

const Search = ({ onMusicSelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`https://pogo-v3.onrender.com/api/search?q=${query}`);
        const data = await response.json();
        setResults(data.data);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une musique..."
            />
            <button onClick={handleSearch}>Rechercher</button>

            <ul>
                {results.map((track) => (
                    <li key={track.id} onClick={() => onMusicSelect(track)}>
                        {track.title} - {track.artist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;