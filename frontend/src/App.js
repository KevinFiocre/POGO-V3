import React, { useState } from "react";
import Search from "./components/Search";
import AmbianceSelector from "./components/AmbianceSelector";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedAmbiance, setSelectedAmbiance] = useState("");

    return (
        <div>
            <h1>POGO Soundscape</h1>
            <Search onMusicSelect={setSelectedTrack} />
            <AmbianceSelector onSelect={setSelectedAmbiance} />
            <MusicPlayer track={selectedTrack} ambiance={selectedAmbiance} />
        </div>
    );
};

export default App;