import React, { useEffect, useRef } from "react";

const MusicPlayer = ({ track, ambiance }) => {
    const audioRef = useRef(null);
    const ambianceRef = useRef(null);

    // Jouer la musique principale
    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [track]);

    // Jouer le son d'ambiance
    useEffect(() => {
        if (ambianceRef.current && ambiance) {
            ambianceRef.current.load();
            ambianceRef.current.play();
        }
    }, [ambiance]);

    return (
        <div className="flex flex-col items-center mt-4 p-4 border rounded-lg shadow-lg bg-white">
            {track && (
                <div className="mb-4">
                    <h2 className="text-lg font-bold">{track.title}</h2>
                    <p className="text-gray-500">{track.artist}</p>
                    <audio ref={audioRef} controls className="mt-2 w-full">
                        <source src={track.preview} type="audio/mpeg" />
                        Votre navigateur ne supporte pas l'audio.
                    </audio>
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