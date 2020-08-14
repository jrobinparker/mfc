const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// connect db
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/lessons', require('./routes/api/lessons'));
app.use('/api/tracks', require('./routes/api/tracks'));


// serve static assets in production
if (process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
