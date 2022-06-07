const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseEmbed = require('../Utils/BaseEmbed.js');
const Profile = require('../models/OwO');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Displays OwO stats of a user')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
  async execute(i) {
    try {
      let user = i.options.getUser('target') || i.user;
      let stats = await Profile.find({ userId: user.id })
      if (!stats.length) {
        await i.reply(`**${user.username}** has no OwO stats`)
      } else {
        let daily = stats[0].daily ?? 0;
        let weekly = stats[0].weekly ?? 0;
        let monthly = stats[0].monhtly ?? 0;
        let total = stats[0].total ?? 0;

        let embed = BaseEmbed(i)
          .setTitle(`${user.username}'s OwO stats`)
          .setDescription(`Daily: \`${daily}\` OwOs\nWeekly: \`${weekly}\` OwOs\nMonthly: \`${monthly}\` OwOs\nTotal: \`${total}\` OwOs\n[Source Code!](https://replit.com/@Astrex69/OwO-counter#Utils/BaseEmbed.js)`)
        await i.reply({ embeds: [embed] })
      }
    } catch (e) {
      console.log(e)
    }
  },
};