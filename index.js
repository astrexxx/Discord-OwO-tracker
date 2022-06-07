const { Client, Collection, Intents } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path')
const { connect } = require('mongoose');
const cron = require('node-cron');
const config = require('./config.json')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Connect to the database
connect(process.env.mongouri);

// Weekly auto OwO reset
if (config.autoWeekly == true) {
  cron.schedule('30 12 * * SUN', async function() {
    await Profile.updateMany({ guildId: process.env.guildId }, { $unset: { weekly: 1 } })
    console.log(`Auto weekly OwO reset was successfull`)
  }, {
    timezone: "Asia/Kolkata"
  });
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('OwO counter is ready!');
  // Daily auto OwO reset
  cron.schedule('30 12 * * *', async function() {
    await Profile.updateMany({ guildId: process.env.guildId }, { $unset: { daily: 1 } })
    console.log(`Auto daily OwO reset was successfull`)
  }, {
    timezone: "Asia/Kolkata"
  });
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
