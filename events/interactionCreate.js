const Discord = require("discord.js");
const BaseEmbed = require('../Utils/BaseEmbed.js');
const { createProfile } = require('../Utils/functions.js');
const Profile = require('../models/OwO');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};