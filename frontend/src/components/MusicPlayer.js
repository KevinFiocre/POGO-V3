import "../index.css";
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
        <div className="Container">
            {/* En-tête */}
            <section className="MP-Head">
                <button onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 2L1 12h3v8h8v-3h4v3h8v-8h3L12 2z"/>
                    </svg>
                </button>
                <img src="/image/LOGO.png" alt="Logo" className="LOGO" />
            </section>

            {/* Image de l'album */}
            {track?.album?.cover_medium && (
                <img 
                    src={track.album.cover_medium} 
                    alt="Cover" 
                    className="MP-Cover"
                />
            )}

            {/* Infos sur la musique */}
            <section className="MP-Nom">
                <h2>{track?.title || "Titre"}</h2>
                <p>{track?.artist?.name || "Nom de l'artiste"}</p>
            </section>

            {/* Timer */}
            <section className="MP-Timer">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="time">0:00 / 3:00</div>
            </section>

            {/* Contrôles */}
            <section className="MP-Control">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <button onClick={togglePlay} className="play">
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    )}
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2L1 12h3v8h8v-3h4v3h8v-8h3L12 2z"/>
                </svg>
            </section>
            
            {/* Bruit d'ambiance */}
            <section className="MP-Ambiant">
                <div className="MP-Ambiant-Head">
                    <h2>Bruit d'ambiance</h2>
                    <button></button>
                </div>
                <div className="MP-Ambiant-Bruit">
                    <img className="MP-Ambiant-Bruit-Image" src="" alt="cover" />
                    <div className="MP-Ambiant-Bruit-Info">
                        <h3>Bruit d’ambiance</h3>
                        <p>Artiste</p>
                    </div>
                    <div className="MP-Ambiant-Volume">
                        <img src="volume_off" alt="Pas de son" />
                        <div></div>
                        <img src="volume_on" alt="" />
                    </div>
                </div>
                <div className="MP-Ambiant-List">
                    <div className="MP-Ambiant-List-Bouton">
                        <img src="" alt="Icon-Bruit" />
                        <p>Pluie</p>
                    </div>
                    <div className="MP-Ambiant-List-Bouton">
                        <img src="" alt="Icon-Bruit" />
                        <p>Forêt</p>
                    </div>
                    <div className="MP-Ambiant-List-Bouton">
                        <img src="" alt="Icon-Bruit" />
                        <p>Oiseaux</p>
                    </div>
                    <div className="MP-Ambiant-Bouton">
                        <button>Modifier</button>
                    </div>
                </div>
            </section>

            <audio ref={audioRef} />
        </div>
    );
};

export default MusicPlayer;