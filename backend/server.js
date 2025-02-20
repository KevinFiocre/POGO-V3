const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Routes API
const deezerRoutes = require("./routes/deezerRoutes");
app.use("/api", deezerRoutes);

const soundscapeRoutes = require("./routes/soundscapeRoutes");
app.use("/api", soundscapeRoutes);

// Servir le frontend React en production
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Gérer les routes React (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur backend en ligne sur http://localhost:${PORT}`);
});