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

    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.src = track.preview;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [track]);

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

    return (
        <div className="w-full max-w-lg px-4">
            <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white text-sm">
                ⬅ Retour
            </button>

            {track && (
                <>
                    <img src={track.album.cover_medium} alt={track.title} className="w-40 h-40 rounded-lg shadow-md mb-4" />
                    <h2 className="text-lg font-bold">{track.title}</h2>
                    <p className="text-gray-400">{track.artist.name}</p>

                    <button
                        onClick={togglePlay}
                        className="mt-4 bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition"
                    >
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        className="w-full mt-4"
                    />

                    <div className="mt-4">
                        <h3 className="text-md font-bold">Sons d'ambiance</h3>
                        <div className="flex gap-4 mt-2">
                            {Object.keys(ambianceSounds).map((ambiance) => (
                                <button key={ambiance} className="px-4 py-2 rounded-lg bg-gray-600">
                                    {ambiance}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <audio ref={audioRef} />
            <audio ref={ambianceRef} loop />
        </div>
    );
};

export default MusicPlayer;