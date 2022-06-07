const Discord = require("discord.js");
const BaseEmbed = require('../Utils/BaseEmbed.js');
const { createProfile } = require('../Utils/functions.js');
const Profile = require('../models/OwO');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    try {
      if (message.guild === null) return;
      if (message.author.bot) return;
      if (message.guild.id !== process.env.guildId) return;

      let user = message.author;
      if (message.content.toLowerCase().includes('owo') || message.content.toLowerCase().includes('uwu')) {
        let timeout = 10000;
        const profile = await Profile.find({ userId: user.id, guildId: message.guild.id });
        if (!profile.length) {
          await createProfile(user, message);
        }
        if (!profile[0]) {
          await Profile.updateOne(
            { userId: user.id, guildId: message.guild.id },
            { $set: { cooldown: Date.now() } }
          );
          await Profile.updateOne({ userId: user.id, guildId: message.guild.id }, { $inc: { daily: 1, weekly: 1, monthly: 1, total: 1 } });
        } else if (Date.now() - profile[0].cooldown > 10000) {
          await Profile.updateOne(
            { userId: user.id, guildId: message.guild.id },
            { $set: { cooldown: Date.now() } }
          );
          await Profile.updateOne({ userId: user.id, guildId: message.guild.id }, { $inc: { daily: 1, weekly: 1, monthly: 1, total: 1 } });
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
};