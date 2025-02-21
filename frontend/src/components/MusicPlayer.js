import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const ambianceSounds = {
    Pluie: "/sounds/pluie.mp3",
    Voiture: "/sounds/voiture.mp3",
};

const MusicPlayer = ({ track, onBack }) => {
    const audioRef = useRef(null);
    const ambianceRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [selectedAmbiance, setSelectedAmbiance] = useState(null);
    const [isAmbiancePlaying, setIsAmbiancePlaying] = useState(false);

    // Lecture automatique à la sélection d'un morceau
    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.src = track.preview;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [track]);

    // Mise à jour de la barre de progression
    useEffect(() => {
        const updateProgress = () => {
            if (audioRef.current) {
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            }
        };
        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", updateProgress);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("timeupdate", updateProgress);
            }
        };
    }, []);

    // Lecture/Pause du morceau principal
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Sélection et lecture du son d'ambiance
    const toggleAmbiance = (ambiance) => {
        if (ambianceRef.current) {
            if (selectedAmbiance === ambiance && isAmbiancePlaying) {
                ambianceRef.current.pause();
                setIsAmbiancePlaying(false);
            } else {
                ambianceRef.current.src = ambianceSounds[ambiance];
                ambianceRef.current.load();
                ambianceRef.current.play();
                setSelectedAmbiance(ambiance);
                setIsAmbiancePlaying(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-6 p-6 border rounded-lg shadow-lg bg-gray-800 text-white w-96">
            {/* Bouton retour */}
            <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white">
                ⬅ Retour
            </button>

            {/* Affichage des informations du morceau */}
            {track ? (
                <>
                    <img src={track.album.cover_medium} alt={track.title} className="w-64 h-64 rounded-lg shadow-md mb-4" />
                    <h2 className="text-xl font-bold">{track.title}</h2>
                    <p className="text-gray-400">{track.artist.name}</p>

                    {/* Bouton Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className="mt-4 bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300"
                    >
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>

                    {/* Barre de progression */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => {
                            if (audioRef.current) {
                                audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;
                                setProgress(e.target.value);
                            }
                        }}
                        className="w-full mt-4"
                    />

                    {/* Contrôle du volume */}
                    <div className="mt-4">
                        <p className="text-sm font-semibold">Volume : {Math.round(volume * 100)}%</p>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => {
                                setVolume(e.target.value);
                                if (audioRef.current) audioRef.current.volume = e.target.value;
                            }}
                            className="w-full mt-1"
                        />
                    </div>

                    {/* Sélection et lecture de sons d’ambiance */}
                    <h3 className="text-md font-bold mt-4">Sons d'ambiance</h3>
                    <div className="flex gap-4 mt-2">
                        {Object.keys(ambianceSounds).map((ambiance) => (
                            <button
                                key={ambiance}
                                onClick={() => toggleAmbiance(ambiance)}
                                className={`px-4 py-2 rounded-lg transition duration-300 ${
                                    selectedAmbiance === ambiance && isAmbiancePlaying
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-500 text-gray-300"
                                }`}
                            >
                                {ambiance}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-400">Aucune musique sélectionnée</p>
            )}

            {/* Audio elements cachés */}
            <audio ref={audioRef} />
            <audio ref={ambianceRef} loop />
        </div>
    );
};

export default MusicPlayer;