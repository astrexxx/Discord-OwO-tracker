const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseEmbed = require('../Utils/BaseEmbed.js');
const Profile = require('../models/OwO');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Displays OwO stats leaderboard')
    .addStringOption(option =>
      option.setName('value')
        .setDescription('Leaderboard type')
        .setRequired(true)
        .addChoices(
          { name: 'Daily', value: 'daily' },
          { name: 'Weekly', value: 'weekly' },
          { name: 'Monthly', value: 'monthly' },
          { name: 'Total', value: 'total' },
        )),
  async execute(i) {
    const type = i.options.getString('value');
    if (!type) return;

    if (type.toLowerCase() == 'daily') {

      let embed = BaseEmbed(i)
      let lb = await Profile.find({ guildId: i.guild.id }).sort({ daily: -1 }).limit(10)
      for (let a = 0; a < lb.length; a++) {
        if (lb[a].daily) {
          let puser = await i.client.users.fetch(`${lb[a].userId}`);

          embed.addField(`#${a + 1} **${puser.username}**`, `${lb[a].daily} OwOs`)
        }
      }
      embed.setDescription(`**Daily OwO Count LB**`)
      embed.setTimestamp()

      await i.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    } else if (type.toLowerCase() == 'weekly') {

      let embed = BaseEmbed(i)
      let lb = await Profile.find({ guildId: i.guild.id }).sort({ weekly: -1 }).limit(10)
      for (let a = 0; a < lb.length; a++) {
        if (lb[a].weekly) {
          let puser = await i.client.users.fetch(`${lb[a].userId}`);

          embed.addField(`#${a + 1} **${puser.username}**`, `${lb[a].weekly} OwOs`)
        }
      }
      embed.setDescription(`**Weekly OwO Count LB**`)
      embed.setTimestamp()

      await i.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    } else if (type.toLowerCase() == 'monthly') {

      let embed = BaseEmbed(i)
      let lb = await Profile.find({ guildId: i.guild.id }).sort({ monthly: -1 }).limit(10)
      for (let a = 0; a < lb.length; a++) {
        if (lb[a].monthly) {
          let puser = await i.client.users.fetch(`${lb[a].userId}`);

          embed.addField(`#${a + 1} **${puser.username}**`, `${lb[a].monthly} OwOs`)
        }
      }
      embed.setDescription(`**Monthly OwO Count LB**`)
      embed.setTimestamp()

      await i.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    } else if (type.toLowerCase() == 'total') {

      let embed = BaseEmbed(i)
      let lb = await Profile.find({ guildId: i.guild.id }).sort({ total: -1 }).limit(10)
      for (let a = 0; a < lb.length; a++) {
        if (lb[a].total) {
          let puser = await i.client.users.fetch(`${lb[a].userId}`);

          embed.addField(`#${a + 1} **${puser.username}**`, `${lb[a].total} OwOs`)
        }
      }
      embed.setDescription(`**Total OwO Count LB**`)
      embed.setTimestamp()

      await i.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
  },
};
