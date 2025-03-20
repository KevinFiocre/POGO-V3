import "../../index.css";
import React, { useEffect, useRef, useState } from "react";

const MusicPlayer = ({ track, onBack }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current && track?.preview) {
            audioRef.current.src = track.preview;
            audioRef.current.load();
            audioRef.current.play().catch(error => console.log("Erreur de lecture audio :", error));
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
        <div className="container">
            {/* En-tête */}
            <section className="header">
                <button onClick={onBack}>
                    {/* Icon removed */}
                </button>
                <h1>AMBIANT</h1>
                {/* Icon removed */}
            </section>

            {/* Image de l'album */}
            {track?.album?.cover_medium && (
                <img 
                    src={track.album.cover_medium} 
                    alt="Cover" 
                    className="album-cover"
                />
            )}

            {/* Infos sur la musique */}
            <section className="musique">
                <h2>{track?.title || "Titre"}</h2>
                <p>{track?.artist?.name || "Nom de l'artiste"}</p>
            </section>

            {/* Timer */}
            <section className="timer">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="time">0:00 / 3:00</div>
            </section>

            {/* Contrôles */}
            <section className="control">
                {/* Icon removed */}
                {/* Icon removed */}
                <button onClick={togglePlay} className="play">
                    {/* Icon removed */}
                </button>
                {/* Icon removed */}
                {/* Icon removed */}
            </section>

            <audio ref={audioRef} />
        </div>
    );
};

export default MusicPlayer;