import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";

const PlaylistPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  // Exemple de données fictives
  const playlist = {
    title: name.replace("-", " "),
    cover: "/image/AlbumTheWeeknd.jpg", // à personnaliser par playlist
    releaseDate: "Mars 2024",
    tracks: [
      {
        title: "After Hours",
        artist: "The Weeknd",
        duration: 361,
        liked: false,
        file: "/music/The Weeknd - After Hours.mp3",
      },
      {
        title: "Save Your Tears",
        artist: "The Weeknd",
        duration: 215,
        liked: true,
        file: "/music/The Weeknd - Save Your Tears.mp3",
      },
      {
        title: "One Of The Girls",
        artist: "The Weeknd, JENNIE & Lily Rose Depp",
        duration: 228,
        liked: true,
        file: "/music/The Weeknd, JENNIE & Lily Rose Depp - One Of The Girls .mp3",
      },
      {
        title: "Timeless",
        artist: "The Weeknd, Playboi Carti",
        duration: 199,
        liked: false,
        file: "/music/The Weeknd, Playboi Carti - Timeless.mp3",
      },
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
          <Link
            to="/player"
            state={{ track, playlist: playlist.tracks }}
            key={index}
            className="P-TrackItem"
          >
            <img src="#" alt="cover" className="P-TrackCover" />
            <div className="P-TrackInfo">
              <p className="P-TrackTitle">{track.title}</p>
              <p className="P-TrackArtist">{track.artist}</p>
            </div>
            <button className="P-LikeButton">{track.liked ? "💜" : "🤍"}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
