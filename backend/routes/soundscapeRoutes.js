const express = require("express");
const router = express.Router();

const soundscapes = {
    "pluie": "/sounds/rain.mp3",
    "foret": "/sounds/forest.mp3",
    "ville": "/sounds/city.mp3"
};

// Récupérer l'URL du son d'ambiance
router.get("/soundscape", (req, res) => {
    const ambiance = req.query.ambiance;
    if (!soundscapes[ambiance]) {
        return res.status(400).json({ error: "Ambiance non disponible" });
    }
    res.json({ ambiance: soundscapes[ambiance] });
});

module.exports = router;