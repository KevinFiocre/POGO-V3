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
                    <img src="/svg/reply.svg" alt="Retour" className="Icon" />
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
                <img src="/svg/repeat.svg" alt="Repeter" className="Icon" />
                <img src="/svg/skip_previous.svg" alt="Précédent" className="Icon" />
                <button onClick={togglePlay} className="play">
                    {isPlaying ? (
                        <img src="/svg/pause.svg" alt="Pause" className="Icon" />
                    ) : (
                        <img src="/svg/play.svg" alt="Lecture" className="Icon" />
                    )}
                </button>
                <img src="/svg/skip_next.svg" alt="Suivant" className="Icon" />
                <img src="/svg/shuffle.svg" alt="Mélanger" className="Icon" />
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
                        <img src="/svg/volume_off.svg" alt="Pas de son" className="Icon" />
                        <div></div>
                        <img src="/svg/volume_up.svg" alt="" className="Icon" />
                    </div>
                </div>
                <div className="MP-Ambiant-List">
                    <div className="MP-Ambiant-List-Bouton">
                        <img src="/svg/rainy.svg" alt="Icon-Bruit" />
                        <p>Pluie</p>
                    </div>
                    <div className="MP-Ambiant-List-Bouton">
                        <img src="/svg/forest.svg" alt="Icon-Bruit" />
                        <p>Forêt</p>
                    </div>
                    <div className="MP-Ambiant-List-Bouton">
                        <img src="/svg/raven.svg" alt="Icon-Bruit" />
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