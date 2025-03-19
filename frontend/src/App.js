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
    { id: 1, name: "Kevin", img: "/image/kevin.png" },
    { id: 2, name: "Lucie", img: "/image/lucie.jpeg" },
    { id: 3, name: "Alexandra", img: "/image/alexandra.jpeg" },
  ];

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleBack = () => {
    setSelectedTrack(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white w-full px-4 py-6">
      {selectedTrack ? (
        <MusicPlayer track={selectedTrack} onBack={handleBack} />
      ) : (
        <>
          {/* Logo */}
          <img src="frontend/public/image/LOGO.png" alt="Logo" className="w-16 h-auto mb-6 md:w-24" />

          {/* Section Musique */}
          <section className="w-full max-w-xs md:max-w-lg lg:max-w-2xl">
            <h2 className="text-lg font-bold mb-4 text-center md:text-xl lg:text-2xl">
              Sélection de musique expérimentale
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleSelectTrack(track)}
                >
                  <img 
                    src={track.album.cover_medium} 
                    alt={track.title} 
                    className="w-28 h-28 bg-gray-400 rounded-md md:w-32 md:h-32 lg:w-40 lg:h-40" 
                  />
                  <p className="text-sm mt-2 text-center md:text-base lg:text-lg">{track.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section Créateurs */}
          <section className="w-full max-w-xs md:max-w-lg lg:max-w-2xl mt-10">
            <h2 className="text-lg font-bold mb-4 text-center md:text-xl lg:text-2xl">Les créateurs</h2>
            <div className="grid grid-cols-3 gap-4">
              {creators.map((creator) => (
                <div key={creator.id} className="flex flex-col items-center">
                  <img 
                    src={creator.img} 
                    alt={creator.name} 
                    className="w-20 h-20 bg-white rounded-full md:w-24 md:h-24 lg:w-28 lg:h-28" 
                  />
                  <p className="text-sm mt-2 text-center md:text-base lg:text-lg">{creator.name}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default App;