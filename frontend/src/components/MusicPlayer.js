import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStepBackward, faStepForward, faShare, faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";

const ambianceSounds = {
    Pluie: "/sounds/pluie.mp3",
    Voiture: "/sounds/voiture.mp3",
};

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
        <div className="deezer-container">
            <div className="deezer-header">
                <button onClick={onBack}>
                    <FontAwesomeIcon icon={faStepBackward} className="svg retour" />
                </button>
                <div>
                    <p>ALBUM</p>
                    <h3>{track?.album?.title || "Nom de l'album"}</h3>
                </div>
                <FontAwesomeIcon icon={faEllipsisH} className="svg chrome" />
            </div>

            {track?.album?.cover_medium && (
                <img 
                    src={track.album.cover_medium} 
                    alt="Page de l'album" 
                    className="deezer-image"
                    style={{ width: "80vw", height: "80vw", objectFit: "cover", display: "block", margin: "0 auto", borderRadius: "8px" }} 
                />
            )}

            <div className="deezer-option">
                <FontAwesomeIcon icon={faShare} className="svg Partage" />
                <FontAwesomeIcon icon={faEllipsisH} className="svg Option" />
                <FontAwesomeIcon icon={faHeart} className="svg Like" />
            </div>

            <div className="deezer-time">{progress}%</div>

            <div className="deezer-music">
                <p>{track?.title || "Titre de la musique"}</p>
                <p>{track?.artist?.name || "Artiste"}</p>
            </div>

            <div className="deezer-control">
                <FontAwesomeIcon icon={faStepBackward} className="svg Precedent" />
                <button onClick={togglePlay} className="Play" style={{ width: "60px", height: "60px", fontSize: "32px" }}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <FontAwesomeIcon icon={faStepForward} className="svg Suivant" />
            </div>

            <div className="deezer-footer">
                <FontAwesomeIcon icon={faEllipsisH} />
                <div className="Timer">0:00 / 3:00</div>
                <FontAwesomeIcon icon={faEllipsisH} className="svg Album" />
            </div>

            <audio ref={audioRef} />
        </div>
    );
};

export default MusicPlayer;