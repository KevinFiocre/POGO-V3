import React, { useState } from "react";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const tracks = [
    { id: 1, title: "The Night We Met", preview: "/music/The Night We Met.mp3", album: { title: "POGO", cover_medium: "/image/The Night We Met.webp" }, artist: { name: "Lord Huron" } },
    { id: 2, title: "Je te laisserai des mots", preview: "/music/Patrick Watson - Je te laisserai des mots.mp3", album: { title: "POGO", cover_medium: "/image/Je te laisserai des mots.jpg" }, artist: { name: "Patrick Watson" } },
    { id: 3, title: "Sweater Weather", preview: "/music/The Neighbourhood - Sweater Weather.mp3", album: { title: "POGO", cover_medium: "/image/Sweater Weather.jpeg" }, artist: { name: "The Neighbourhood" } },
    { id: 4, title: "Cry", preview: "/music/Cry - Cigarettes After Sex.mp3", album: { title: "POGO", cover_medium: "/image/Cry.jpeg" }, artist: { name: "Cigarettes After Sex" } },
  ];

  const creators = [
    { id: 1, name: "Kevin", img: "/image/kevin.png", link: "https://www.instagram.com/kd3.6.7/" },
    { id: 2, name: "Lucie", img: "/image/lucie.jpeg", link: "https://www.linkedin.com/in/lucie" },
    { id: 3, name: "Alexandra", img: "/image/alexandra.jpeg", link: "https://www.instagram.com/alexandra" },
  ];

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleBack = () => {
    setSelectedTrack(null);
  };

  return (
    <div className="Container">
      {selectedTrack ? (
        <MusicPlayer track={selectedTrack} onBack={handleBack} />
      ) : (
        <>
          {/* Logo */}
          <img src="/image/LOGO.png" alt="Logo" className="LOGO" />

          {/* Section Musique avec Scroll Horizontal pleine largeur */}
          <section className="H-Musique">
            <h2>
              Sélection de musique expérimentale
            </h2>
            <div className="H-Musique-Liste">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="H-Musique-Liste-Affiche"
                  onClick={() => handleSelectTrack(track)}
                >
                  <img 
                    src={track.album.cover_medium} 
                    alt={track.title} 
                    className="H-Musique-Liste-Affiche-Image" 
                  />
                  <p className="H-Musique-Liste-Affiche-Titre">{track.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section Créateurs avec Scroll Horizontal pleine largeur */}
          <section className="H-Createur">
            <h2 className="">Les créateurs</h2>
            <div className="H-Createur-Liste">
              {creators.map((creator) => (
                <a 
                  key={creator.id} 
                  href={creator.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="H-Createur-Liste-Affiche"
                  onClick={() => console.log(`Ouverture du lien: ${creator.link}`)}
                >
                  <img 
                    src={creator.img} 
                    alt={creator.name} 
                    className="H-Createur-Liste-Affiche-Image" 
                  />
                  <p className="H-Createur-Liste-Affiche-Nom">{creator.name}</p>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default App;