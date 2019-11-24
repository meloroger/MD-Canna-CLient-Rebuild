const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// CORS middleware
app.use(cors());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

const io = require('socket.io').listen(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

const stream = io.of('/data');
app.post('/data/stream', (req, res) => {
  res.send(req.body);
  stream.emit('data-stream', req.body);
});

// Any route not specified above will direct here
app.get('*', (req, res) => {
  const fileName = req.path;
  if (fileName.endsWith('.js')) {
    res.setHeader('content-type', 'text/javascript');
  }

  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Server Init
/* app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
}); */
