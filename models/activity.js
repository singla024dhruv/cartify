const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    createdAt: { type: Date, default: Date.now,expires:86400},
  timestamp: { type: Date, default: Date.now },
});
const ActivitySchema = mongoose.model('ActivitySchema', activitySchema);
module.exports = ActivitySchema;