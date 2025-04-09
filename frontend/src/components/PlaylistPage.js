import React, { useEffect, useRef } from "react";

const MusicPlayer = ({ track }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && track?.file) {
      audioRef.current.src = track.file;
      audioRef.current.play();
    }
  }, [track]);

  return (
    <div>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default MusicPlayer;
