const cron = require('node-cron');
const Quiz = require('../models/Quiz');

cron.schedule('* * * * *', async () => { // Runs every minute
    const now = new Date();
    await Quiz.updateMany({ startDate: { $lte: now }, endDate: { $gt: now } }, { status: 'active' });
    await Quiz.updateMany({ endDate: { $lte: now } }, { status: 'finished' });
});
