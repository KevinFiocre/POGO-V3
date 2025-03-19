import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStepBackward, faStepForward, faRepeat, faRandom, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faChromecast } from "@fortawesome/free-brands-svg-icons";

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
                    <FontAwesomeIcon icon={faArrowLeft} className="svg" style={{ fontSize: "64px" }} />
                </button>
                <img className="logo" src="/logo.png" alt="logo" />
                <FontAwesomeIcon icon={faChromecast} className="svg" style={{ fontSize: "64px" }} />
            </section>

            {/* Image de l'album */}
            {track?.album?.cover_medium && (
                <img 
                    src={track.album.cover_medium} 
                    alt="Cover" 
                    className="album-cover"
                    style={{ width: "500px", height: "500px", objectFit: "cover" }}
                />
            )}

            {/* Timer */}
            <section className="timer">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="time">0:00 / 3:00</div>
            </section>

            {/* Infos sur la musique */}
            <section className="musique">
                <h2>{track?.title || "Titre"}</h2>
                <p>{track?.artist?.name || "Nom de l'artiste"}</p>
            </section>

            {/* Contrôles */}
            <section className="control">
                <FontAwesomeIcon icon={faRepeat} className="svg" style={{ fontSize: "64px" }} />
                <div className="player">
                    <FontAwesomeIcon icon={faStepBackward} className="svg" style={{ fontSize: "64px" }} />
                    <button onClick={togglePlay} className="play">
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} style={{ fontSize: "64px" }} />
                    </button>
                    <FontAwesomeIcon icon={faStepForward} className="svg" style={{ fontSize: "64px" }} />
                </div>
                <FontAwesomeIcon icon={faRandom} className="svg" style={{ fontSize: "64px" }} />
            </section>

            <audio ref={audioRef} />
        </div>
    );
};

export default MusicPlayer;