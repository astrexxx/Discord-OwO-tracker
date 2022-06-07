const Profile = require('../models/OwO');
module.exports = {

  createProfile: async function createProfile(user, message) {
    const profile = await Profile.find({ userId: user.id });
    if (!profile.length) {
      await new Profile({
        userId: user.id,
        guildId: message.guild.id,
        daily: 0,
        weekly: 0,
        monthly: 0,
        total: 0,
        cooldown: new Date()
      }).save();
      return true;
    }
    return false;
  }
};