import React, { useState } from "react";
import Search from "./components/Search";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedAmbiance, setSelectedAmbiance] = useState("");

  return (
    <div className="container mx-auto p-4">
      {selectedTrack ? (
        <MusicPlayer track={selectedTrack} ambiance={selectedAmbiance} onBack={() => setSelectedTrack(null)} />
      ) : (
        <Search onMusicSelect={setSelectedTrack} />
      )}
    </div>
  );
};

export default App;