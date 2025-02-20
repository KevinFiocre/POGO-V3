import React, { useState, useEffect } from "react";

const MusicPlayer = ({ track, ambiance }) => {
    const [ambianceUrl, setAmbianceUrl] = useState("");

    useEffect(() => {
        if (ambiance) {
            fetch(`https://pogo-v3.onrender.com/api/soundscape?ambiance=${ambiance}`)
                .then(res => res.json())
                .then(data => setAmbianceUrl(data.ambiance));
        }
    }, [ambiance]);

    return (
        <div>
            {track && <audio controls src={track.preview} />}
            {ambianceUrl && <audio controls src={ambianceUrl} />}
        </div>
    );
};

export default MusicPlayer;