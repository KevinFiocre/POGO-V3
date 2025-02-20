const express = require('express');
const router = express.Router();
const { searchHandler } = require('../controllers/searchController');

// Définition de la route GET /api/search
router.get('/', searchHandler);

module.exports = router;