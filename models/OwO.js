const { model, Schema } = require('mongoose');
module.exports = model(
  'OwO1',
  new Schema({
    userId: String,
    guildId: String, 
    daily: Number,
    weekly: Number,
    monthly: Number,
    total: Number,
    cooldown: Date
  })
);