import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PlaylistPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  // Exemple de données fictives
  const playlist = {
    title: name.replace("-", " "),
    cover: "/image/Sweater Weather.jpeg", // à personnaliser par playlist
    releaseDate: "Mars 2024",
    tracks: [
      { title: "Cry For Me", artist: "The Weeknd", duration: 210, liked: false },
      { title: "Open Hearts", artist: "The Weeknd", duration: 185, liked: true },
    ],
  };

  const totalDuration = playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}min ${secs < 10 ? "0" : ""}${secs}s`;
  };

  return (
    <div className="P-Page">
      <button className="P-BackButton" onClick={handleBack}>← Retour</button>
      <div className="P-Header">
        <img src={playlist.cover} alt={playlist.title} className="P-Cover" />
        <div className="P-Info">
          <h1 className="P-Title">{playlist.title}</h1>
          <p className="P-Subtitle">Deezer Artist Editor</p>
          <div className="P-Details">
            <p>{playlist.tracks.length} titres • {formatDuration(totalDuration)}</p>
            <p>Sortie : {playlist.releaseDate}</p>
          </div>
          <div className="P-Actions">
            <button className="P-BtnAction">💜</button>
            <button className="P-BtnAction">⬇️</button>
            <button className="P-BtnAction">🔁</button>
            <button className="P-BtnPlay">▶️</button>
          </div>
        </div>
      </div>

      <div className="P-TrackList">
        {playlist.tracks.map((track, index) => (
          <div key={index} className="P-TrackItem">
            <img src="#" alt="cover" className="P-TrackCover" />
            <div className="P-TrackInfo">
              <p className="P-TrackTitle">{track.title}</p>
              <p className="P-TrackArtist">{track.artist}</p>
            </div>
            <button className="P-LikeButton">{track.liked ? "💜" : "🤍"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
