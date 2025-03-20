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
                <img src="/svg/reply.svg" alt="Retour" />
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
                <img src="/svg/repeat.svg" alt="Repeter" />
                <img src="/svg/previous.svg" alt="Précédent" />
                <button onClick={togglePlay} className="play">
                   <img src={isPlaying ? "/svg/pause.svg" : "/svg/play.svg"} alt="Lecture" />
                </button>
                <img src="/svg/next.svg" alt="Suivant" />
                <img src="/svg/shuffle.svg" alt="Mélanger" />
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