const express = require("express");
const axios = require("axios");
const router = express.Router();

// Recherche de musique sur Deezer
router.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Veuillez fournir un terme de recherche" });
    }

    try {
        const response = await axios.get(`https://api.deezer.com/search?q=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la recherche sur Deezer" });
    }
});

module.exports = router;