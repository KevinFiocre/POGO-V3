import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlaylistPage.css";

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
    <div className="PlaylistPage">
      <button className="BackButton" onClick={handleBack}>← Retour</button>
      <div className="PlaylistHeader">
        <img src={playlist.cover} alt={playlist.title} className="PlaylistCover" />
        <div className="PlaylistInfo">
          <h1 className="PlaylistTitle">{playlist.title}</h1>
          <p className="PlaylistSubtitle">Deezer Artist Editor</p>
          <div className="PlaylistActions">
            <button className="BtnAction">💜</button>
            <button className="BtnAction">⬇️</button>
            <button className="BtnAction">🔁</button>
            <button className="BtnPlay">▶️</button>
          </div>
        </div>
      </div>

      <div className="TrackList">
        {playlist.tracks.map((track, index) => (
          <div key={index} className="TrackItem">
            <img src="/image/cover-default.jpg" alt="cover" className="TrackCover" />
            <div className="TrackInfo">
              <p className="TrackTitle">{track.title}</p>
              <p className="TrackArtist">{track.artist}</p>
            </div>
            <button className="LikeButton">{track.liked ? "💜" : "🤍"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
