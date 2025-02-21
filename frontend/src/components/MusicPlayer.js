import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = ({ track, ambiance, onBack }) => {
    const audioRef = useRef(null);
    const ambianceRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [track]);

    useEffect(() => {
        if (ambianceRef.current && ambiance) {
            ambianceRef.current.load();
            ambianceRef.current.play();
        }
    }, [ambiance]);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const updateProgress = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    return (
        <div className="flex flex-col items-center mt-4 p-4 border rounded-lg shadow-lg bg-white">
            <button onClick={onBack} className="mb-4 text-gray-500">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Retour
            </button>
            {track && (
                <div className="mb-4 text-center">
                    <img src={track.album.cover_medium} alt={track.title} className="w-48 h-48 rounded-lg mb-4" />
                    <h2 className="text-lg font-bold">{track.title}</h2>
                    <p className="text-gray-500">{track.artist.name}</p>
                    <audio ref={audioRef} onTimeUpdate={updateProgress} className="hidden">
                        <source src={track.preview} type="audio/mpeg" />
                        Votre navigateur ne supporte pas l'audio.
                    </audio>
                    <button onClick={togglePlayPause} className="mt-4 bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300">
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <input type="range" value={progress} min="0" max="100" className="w-full mt-4" readOnly />
                </div>
            )}
            {ambiance && (
                <div className="mt-4">
                    <h3 className="text-md font-bold text-gray-700">Ambiance : {ambiance}</h3>
                    <audio ref={ambianceRef} controls loop className="mt-2 w-full">
                        <source src={`/sounds/${ambiance}.mp3`} type="audio/mpeg" />
                        Votre navigateur ne supporte pas l'audio.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;