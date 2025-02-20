import React, { useEffect, useState } from "react";

const Search = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://pogo-v3.onrender.com/api/search") // URL de ton backend
            .then(response => response.json())
            .then(data => console.log("Données reçues :", data))
            .catch(error => console.error("Erreur API :", error));
    }, []);

    return (
        <div>
            <h1>Recherche</h1>
            {data ? <p>{data.message}</p> : <p>Chargement...</p>}
        </div>
    );
};

export default Search;