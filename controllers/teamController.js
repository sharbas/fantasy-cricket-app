const Team = require('../models/Team.js');
const playersData = require('../data/players.json');

const normalizeName = (name) => name.trim().toLowerCase();

const addTeam = async (req, res) => {
  try {
    const { name, players, captain, viceCaptain } = req.body;

    // Log the incoming request data
    console.log('Incoming request body:', req.body);

    // Normalize incoming player names
    const normalizedPlayers = players.map(normalizeName);
    const normalizedCaptain = normalizeName(captain);
    const normalizedViceCaptain = normalizeName(viceCaptain);

    // Validate team size
    if (normalizedPlayers.length !== 11) {
      return res.status(400).json({ msg: 'Team must have exactly 11 players.' });
    }

    // Validate captain and vice-captain
    if (!normalizedPlayers.includes(normalizedCaptain) || !normalizedPlayers.includes(normalizedViceCaptain)) {
      return res.status(400).json({ msg: 'Captain and vice-captain must be in the team.' });
    }

    // Normalize player names in the JSON data
    const normalizedPlayersData = playersData.map(player => ({
      ...player,
      Player: normalizeName(player.Player)
    }));

    // Validate player roles and team composition rules
    const playerDocs = normalizedPlayersData.filter(player => normalizedPlayers.includes(player.Player));
    console.log('Filtered player documents:', playerDocs);

    if (playerDocs.length !== 11) {
      return res.status(400).json({ msg: 'Some players are not found in the database.' });
    }

    const roleCount = { WICKETKEEPER: 0, BATTER: 0, ALLROUNDER: 0, BOWLER: 0 };
    const teamCount = {};

    playerDocs.forEach(player => {
      const role = player.Role;
      const team = player.Team;
      roleCount[role]++;
      teamCount[team] = (teamCount[team] || 0) + 1;
    });

    // Log the role count after processing player data
    console.log('Role count:', roleCount);

    // Validate role constraints
    const roleConstraints = { WICKETKEEPER: [1, 8], BATTER: [1, 8], ALLROUNDER: [1, 8], BOWLER: [1, 8] };
    for (const [role, [min, max]] of Object.entries(roleConstraints)) {
      if (roleCount[role] < min || roleCount[role] > max) {
        return res.status(400).json({ msg: `Invalid number of ${role}s. Your team should have min ${min} ${role} and max ${max} ${role}.` });
      }
    }

    if (Object.values(teamCount).some(count => count > 10)) {
      return res.status(400).json({ msg: 'Cannot have more than 10 players from a single team.' });
    }

    const newTeam = new Team({
      name,
      players,
      captain,
      viceCaptain,
    });

    await newTeam.save();
    res.json(newTeam);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};





const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  addTeam,
  getTeams,
};
