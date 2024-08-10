const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const quizRoutes = require('./routes/quizRoutes');
const connectDB = require('./config/database');
const errorHandler = require('./utils/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(rateLimiter);
app.use('/api', quizRoutes);

// Start the cron job for quiz status updates
require('./jobs/quizstatusJob.js');

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
