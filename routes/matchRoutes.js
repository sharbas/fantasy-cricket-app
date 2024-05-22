// routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const { processMatchResult, getTeamResults } = require('../controllers/matchController');

router.post('/process-result', processMatchResult); 
router.get('/team-result', getTeamResults);

module.exports = router;
