const activityQueue = require('../config/bull');
const Activity = require("../models/activitySchema");
activityQueue.process(async (job) => {
    console.log('Logging activity: ', job.data);
    try {
        await Activity.create({
            userId: job.data.userId,
            action: job.data.action
        });
        console.log('Activity saved to DB');
    }
    catch (err) {
        console.error('Failed to log activity', err);
    }
});