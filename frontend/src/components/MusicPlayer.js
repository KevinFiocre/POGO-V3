import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = ({ track, ambiance }) => {
    const audioRef = useRef(null);
    const ambianceRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isAmbiancePlaying, setIsAmbiancePlaying] = useState(false);

    // Jouer la musique principale
    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.src = track.preview;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [track]);

    // Mettre à jour la barre de progression
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

    // Jouer le son d'ambiance
    useEffect(() => {
        if (ambianceRef.current && ambiance) {
            ambianceRef.current.src = `/sounds/${ambiance}.mp3`;
            ambianceRef.current.load();
            ambianceRef.current.play();
            setIsAmbiancePlaying(true);
        }
    }, [ambiance]);

    // Play / Pause de la musique principale
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

    // Play / Pause du son d'ambiance
    const toggleAmbiance = () => {
        if (ambianceRef.current) {
            if (isAmbiancePlaying) {
                ambianceRef.current.pause();
            } else {
                ambianceRef.current.play();
            }
            setIsAmbiancePlaying(!isAmbiancePlaying);
        }
    };

    return (
        <div className="flex flex-col items-center mt-6 p-6 border rounded-lg shadow-lg bg-gray-800 text-white w-96">
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
                </>
            ) : (
                <p className="text-gray-400">Aucune musique sélectionnée</p>
            )}

            {/* Ambiance Selector */}
            {ambiance && (
                <div className="mt-4">
                    <h3 className="text-md font-bold">Son d'ambiance : {ambiance}</h3>
                    <button
                        onClick={toggleAmbiance}
                        className="mt-2 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
                    >
                        {isAmbiancePlaying ? "⏸️ Pause" : "▶️ Jouer"}
                    </button>
                </div>
            )}

            {/* Audio elements cachés */}
            <audio ref={audioRef} />
            <audio ref={ambianceRef} loop />
        </div>
    );
};

export default MusicPlayer;