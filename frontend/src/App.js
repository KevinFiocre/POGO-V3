import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const tracks = [
    { id: 1, title: "Titre Musique 1", src: "/music/track1.mp3", img: "#" },
    { id: 2, title: "Titre Musique 2", src: "/music/track2.mp3", img: "#" },
    { id: 3, title: "Titre Musique 3", src: "/music/track3.mp3", img: "#" },
    { id: 4, title: "Titre Musique 4", src: "/music/track4.mp3", img: "#" },
  ];

  const creators = [
    { id: 1, name: "Kevin", img: "#" },
    { id: 2, name: "Lucie", img: "#" },
    { id: 3, name: "Alexandra", img: "#" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white w-full px-4 py-6">
      {/* Logo */}
      <img src="#" alt="Logo" className="w-16 h-auto mb-6" />

      {/* Section Musique */}
      <section className="w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Sélection de musique expérimentale</h2>
        <div className="grid grid-cols-2 gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate("/PlayerMusique", { state: { track } })}
            >
              <img src={track.img} alt={track.title} className="w-28 h-28 bg-gray-400 rounded-md" />
              <p className="text-sm mt-2">{track.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Créateurs */}
      <section className="w-full max-w-md mt-10">
        <h2 className="text-lg font-bold mb-4">Les créateurs</h2>
        <div className="grid grid-cols-3 gap-4">
          {creators.map((creator) => (
            <div key={creator.id} className="flex flex-col items-center">
              <img src={creator.img} alt={creator.name} className="w-20 h-20 bg-white rounded-full" />
              <p className="text-sm mt-2">{creator.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;