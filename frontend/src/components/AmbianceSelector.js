import React from "react";

const AmbianceSelector = ({ onSelect }) => {
    return (
        <div className="flex flex-col items-center mt-4">
            <label className="font-bold text-lg mb-2">Choisissez un son d'ambiance :</label>
            <select 
                onChange={(e) => onSelect(e.target.value)} 
                className="border p-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-black"
            >
                <option value="">Aucun</option>
                <option value="pluie">🌧️ Pluie</option>
                <option value="foret">🌲 Forêt</option>
                <option value="ville">🏙️ Ville</option>
            </select>
        </div>
    );
};

export default AmbianceSelector;