# Discord-OwO-tracker
A discord bot to track "owo", usually used to help with OwO bot

---

## Requirements
- Discord.js v13 (`npm install discord.js@latest`)
- `applications.commands` scope enabled for your bot in Developer Portal (For Slash Cmds).
- NodeJS v16.6 or higher
- Basic knowledge of JS or Discord.JS

---

## How to start the bot?

- Run `npm install` to install all the dependencies first
- Run `node deploy-commands.js` to register slash commands
- Finally run `node .` to start the bot

---

## Features

<summary>Available Features</summary>
  
| Features             | Availability |
| -------------------- | ------------ |
| Auto daily reset     |     ✅       |
| Auto weekly reset    |     ✅       |
| Daily, Weekly, Monthly, Total stats |     ✅       |

</details>

---

## Configuration
- **Edit the `config.json` file and enter the  required values**
```json
{
  "embedColor": "COLOR_HEX_CODE",
  "autoWeekly": "TRUE_OR_FALSE",
}
```
- **Create an .env file and enter the  required values**
```env
{
  TOKEN="DISCORD_BOT_TOKEN",
  mongouri="MONGODB_URI",
  guildId="YOUR_SERVER_ID",
  clientId="YOUR_BOT_ID"
}
```

## ⭐ Star the Repo if you liked it!
