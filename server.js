// Config
const PORT = process.env.PORT || 3000;

// Imports
const path = require('path');
const express = require('express');
const app = express();

// Services
const ScoreService = require('./services/ScoreService');
const scoreService = new ScoreService('./data/scores.json');

// Globals
app.locals.siteName = 'Retro Games | Snake';

// Middlewares
app.use(express.json());
app.use(express.urlencoded(true));

// Static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'static')));

// Routes
const routes = require('./routes');
app.use('/', routes({ scoreService }));
app.use('*', (req, res) => {
  res.render('error');
});

// Start server
app.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`Server run on port - ${PORT}`);
});
