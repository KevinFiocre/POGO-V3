import React, { useState } from "react";
import AmbianceSelector from "./components/AmbianceSelector";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [showPlayer, setShowPlayer] = useState(false);

    // Liste de morceaux statiques
    const tracks = [
        { id: 1, title: "Relaxing Waves", src: "/music/relaxing-waves.mp3" },
        { id: 2, title: "Calm Piano", src: "/music/calm-piano.mp3" },
        { id: 3, title: "Lo-Fi Beats", src: "/music/lofi-beats.mp3" },
        { id: 4, title: "Nature Sounds", src: "/music/nature-sounds.mp3" },
        { id: 5, title: "Deep Focus", src: "/music/deep-focus.mp3" },
    ];

    const handleSelectTrack = (track) => {
        setSelectedTrack(track);
        setShowPlayer(true);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white w-full">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center relative">
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
                        <MusicPlayer track={selectedTrack} />

                        {/* Sélection du son d’ambiance avec scroll */}
                        <div className="overflow-x-scroll flex space-x-4 p-4 bg-gray-700 rounded-lg mt-4">
                            <AmbianceSelector onSelect={() => {}} />
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-bold mb-4">Choisissez une musique</h2>
                        <div className="flex flex-col space-y-4">
                            {tracks.map((track) => (
                                <button
                                    key={track.id}
                                    onClick={() => handleSelectTrack(track)}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    {track.title}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;