const Bull = require('bull');

const redisClient = require('./redis.js');
activityQueue = new Bull('user-activity-queue', {
    redis: redisClient,
});


module.exports = activityQueue;