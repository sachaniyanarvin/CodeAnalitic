const express = require('express');
const app = express(); //! initilize the Server.
const aiRoute = require('./Routes/ai.routes');
const cors = require('cors');

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Vite's default port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));

//! Root Routes For Tesing to Server is running.
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use('/ai', aiRoute);

module.exports = app;