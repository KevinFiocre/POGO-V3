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
    { id: 1, name: "Kevin", img: "/image/kevin.png", link: "https://www.instagram.com/kevin" },
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
    <div className="flex flex-col items-center min-h-screen bg-black text-white w-full px-0 py-6">
      {selectedTrack ? (
        <MusicPlayer track={selectedTrack} onBack={handleBack} />
      ) : (
        <>
          {/* Logo */}
          <img src="/image/LOGO.png" alt="Logo" className="w-16 h-auto mb-6 md:w-24" />

          {/* Section Musique avec Scroll Horizontal pleine largeur */}
          <section className="w-full mb-16">
            <h2 className="text-lg font-bold mb-4 text-center md:text-xl lg:text-2xl">
              Sélection de musique expérimentale
            </h2>
            <div className="flex overflow-x-scroll whitespace-nowrap space-x-4 px-2 scrollbar-hide w-full">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-col items-center cursor-pointer w-1/4 min-w-[25%]"
                  onClick={() => handleSelectTrack(track)}
                >
                  <img 
                    src={track.album.cover_medium} 
                    alt={track.title} 
                    className="w-[500px] h-[500px] bg-gray-400 rounded-md object-cover sm:w-[200px] sm:h-[200px]" 
                  />
                  <p className="text-sm mt-2 text-center">{track.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section Créateurs avec Scroll Horizontal pleine largeur */}
          <section className="w-full mt-20">
            <h2 className="text-lg font-bold mb-4 text-center md:text-xl lg:text-2xl">Les créateurs</h2>
            <div className="flex overflow-x-scroll whitespace-nowrap space-x-4 px-2 scrollbar-hide w-full">
              {creators.map((creator) => (
                <a 
                  key={creator.id} 
                  href={creator.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col items-center w-1/4 min-w-[25%]"
                >
                  <img 
                    src={creator.img} 
                    alt={creator.name} 
                    className="w-[500px] h-[500px] bg-white rounded-full sm:w-[200px] sm:h-[200px]" 
                  />
                  <p className="text-sm mt-2 text-center">{creator.name}</p>
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