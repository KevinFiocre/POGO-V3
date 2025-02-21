import React, { useState } from "react";
import Search from "./components/Search";
import AmbianceSelector from "./components/AmbianceSelector";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedAmbiance, setSelectedAmbiance] = useState("");

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold text-center">POGO Soundscape</h1>
            <Search onMusicSelect={setSelectedTrack} />
            <AmbianceSelector onSelect={setSelectedAmbiance} />
            <MusicPlayer track={selectedTrack} ambiance={selectedAmbiance} />
        </div>
    );
};

export default App;