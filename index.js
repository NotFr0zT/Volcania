require('dotenv').config();
const keepAlive = require('./server');
const { Client, Collection } = require('discord.js');
require('discord-reply');
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    shards: "auto",
    shardCount: 5,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
require('discord-buttons')(client);

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Map();

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const setups = require('./handlers/events');
setups(client);

keepAlive();

client.login(process.env.TOKEN);