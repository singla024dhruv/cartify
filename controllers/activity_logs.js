// controllers/activityController.js

const Activity = require("../models/activity");

const getActivities = async (req, res) => {
  const { action, page = 1, limit = 10 } = req.query;

  const query = {};
  if (action) query.action = action;

  const skip = (page - 1) * limit;

  const activities = await Activity.find(query)
    .sort({ timestamp: -1 }) // latest first
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Activity.countDocuments(query);

  res.status(200).json({
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    activities,
  });
};

module.exports = { getActivities };
