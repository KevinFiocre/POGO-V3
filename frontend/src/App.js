import React, { useState } from "react";
import Search from "./components/Search";
import AmbianceSelector from "./components/AmbianceSelector";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedAmbiance, setSelectedAmbiance] = useState("");
    const [showPlayer, setShowPlayer] = useState(false);

    // Gérer la navigation entre la recherche et le lecteur
    const handleSelectTrack = (track) => {
        setSelectedTrack(track);
        setShowPlayer(true);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-96 text-center">
                {showPlayer ? (
                    <>
                        {/* Bouton Retour */}
                        <button 
                            onClick={() => setShowPlayer(false)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg absolute top-4 left-4"
                        >
                            ⬅️ Retour
                        </button>

                        {/* Lecteur de musique */}
                        <MusicPlayer track={selectedTrack} ambiance={selectedAmbiance} />
                        
                        {/* Sélection du son d’ambiance */}
                        <AmbianceSelector onSelect={setSelectedAmbiance} />
                    </>
                ) : (
                    <Search onMusicSelect={handleSelectTrack} />
                )}
            </div>
        </div>
    );
};

export default App;