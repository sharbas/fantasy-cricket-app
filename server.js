// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');

const teamRoutes = require('./routes/teamRoutes');
const matchRoutes = require('./routes/matchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', teamRoutes);
app.use('/api', matchRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
