// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Import route handlers for Learning Service and User Service
const learningServiceRouter = require('./LearningBackend/LearningService');
const userServiceRouter = require('./UserBackend/UserService');

// Path to the directory where static files are located
const staticFilesPath = path.join(__dirname, '../frontend/dist');

// Serve static files
app.use(express.static(staticFilesPath));

// Optionally define a route for '/' if you want to handle it explicitly
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: staticFilesPath });
});

// Mount route handlers
app.use('/learning-service', learningServiceRouter);
app.use('/user-service', userServiceRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
