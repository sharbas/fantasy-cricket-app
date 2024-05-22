// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const { addTeam, getTeams } = require('../controllers/teamController');

router.post('/add-team', addTeam);
router.get('/teams', getTeams);

module.exports = router;
