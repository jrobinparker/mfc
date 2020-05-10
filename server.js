const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect db
connectDB();

app.get('/', (req, res) => res.send('api running'));

// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/lessons', require('./routes/api/lessons'));
app.use('/api/tracks', require('./routes/api/tracks'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
