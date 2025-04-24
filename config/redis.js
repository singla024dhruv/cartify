const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect().then(()=>console.log('Connected to Redis successfully')).catch(console.error);
redisClient.on('error', err => console.log('Redis Client Error', err));

module.exports = redisClient;