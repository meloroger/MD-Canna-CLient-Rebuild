const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  // console.log(req);
  res.send('express server...');
});

// Any route not specified above will direct here
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Server Init
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
