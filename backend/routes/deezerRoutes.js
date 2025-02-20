const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Veuillez fournir un terme de recherche" });
    }

    try {
        // 🔹 Appel de l'API Deezer
        const response = await axios.get(`https://api.deezer.com/search?q=${query}`);
        
        // 🔹 Vérification si Deezer retourne des résultats
        if (response.data && response.data.data.length > 0) {
            res.json(response.data);
        } else {
            res.json({ message: "Aucun résultat trouvé sur Deezer" });
        }
    } catch (error) {
        console.error("Erreur lors de l'appel à Deezer :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;