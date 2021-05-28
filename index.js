require('dotenv').config();
const keepAlive = require('./server');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
require('discord-reply')
const client = new Client({ disableMentions: 'everyone', partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'], ws: { intents: Intents.ALL } });

client.commands = new Collection();
client.aliases = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});



keepAlive();
client.login(process.env.TOKEN);

