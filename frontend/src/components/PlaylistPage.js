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
    cover: "/image/cover-default.jpg", // à personnaliser par playlist
    tracks: [
      { title: "Cry For Me", artist: "The Weeknd", liked: false },
      { title: "Open Hearts", artist: "The Weeknd", liked: true },
    ],
  };

  return (
    <div className="P-Page">
      <button className="P-BackButton" onClick={handleBack}>← Retour</button>
      <div className="P-Header">
        <img src={playlist.cover} alt={playlist.title} className="P-Cover" />
        <div className="P-Info">
          <h1 className="P-Title">{playlist.title}</h1>
          <p className="P-Subtitle">Deezer Artist Editor</p>
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
            <img src="/image/cover-default.jpg" alt="cover" className="P-TrackCover" />
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
