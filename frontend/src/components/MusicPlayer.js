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
        <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px" }}>
            {/* En-tête */}
            <section className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "20px" }}>
                <button onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} className="svg" style={{ fontSize: "40px" }} />
                </button>
                <h1 style={{ fontSize: "40px", textAlign: "center", flex: 1 }}>AMBIANT</h1>
                <FontAwesomeIcon icon={faChromecast} className="svg" style={{ fontSize: "40px" }} />
            </section>

            {/* Image de l'album */}
            {track?.album?.cover_medium && (
                <img 
                    src={track.album.cover_medium} 
                    alt="Cover" 
                    className="album-cover"
                    style={{ width: "400px", height: "400px", objectFit: "cover", marginBottom: "20px" }}
                />
            )}

            {/* Infos sur la musique */}
            <section className="musique" style={{ textAlign: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "22px" }}>{track?.title || "Titre"}</h2>
                <p style={{ fontSize: "18px", opacity: 0.8 }}>{track?.artist?.name || "Nom de l'artiste"}</p>
            </section>

            {/* Timer */}
            <section className="timer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "20px" }}>
                <div className="progress-bar" style={{ flex: 1, height: "5px", background: "#555", borderRadius: "5px", margin: "0 10px" }}>
                    <div className="progress" style={{ width: `${progress}%`, height: "5px", background: "#FFF", borderRadius: "5px" }}></div>
                </div>
                <div className="time" style={{ fontSize: "14px" }}>0:00 / 3:00</div>
            </section>

            {/* Contrôles */}
            <section className="control" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                <FontAwesomeIcon icon={faRepeat} className="svg" style={{ fontSize: "50px" }} />
                <FontAwesomeIcon icon={faStepBackward} className="svg" style={{ fontSize: "50px" }} />
                <button onClick={togglePlay} className="play">
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} style={{ fontSize: "50px" }} />
                </button>
                <FontAwesomeIcon icon={faStepForward} className="svg" style={{ fontSize: "50px" }} />
                <FontAwesomeIcon icon={faRandom} className="svg" style={{ fontSize: "50px" }} />
            </section>

            <audio ref={audioRef} />
        </div>
    );
};

export default MusicPlayer;