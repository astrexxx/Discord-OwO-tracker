const { MessageEmbed } = require("discord.js");
const config = require('../config.json')

function BaseEmbed(i) {
  if (!i) {
    throw Error("'interaction' must be passed down as param! (BaseEmbed)");
  }
  return new MessageEmbed()
    .setAuthor({
      name: i.user.username,
      iconURL: i.user.displayAvatarURL()
    })
    .setColor(config.embedColor)
    .setTimestamp()
}

module.exports = BaseEmbed;