import React from "react";

const AmbianceSelector = ({ onSelect }) => {
    return (
        <div>
            <label>Choisissez un son d'ambiance :</label>
            <select onChange={(e) => onSelect(e.target.value)}>
                <option value="pluie">Pluie</option>
                <option value="foret">Forêt</option>
                <option value="ville">Ville</option>
            </select>
        </div>
    );
};

export default AmbianceSelector;