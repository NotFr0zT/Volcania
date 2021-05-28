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


client.on('guildCreate', async guild => {
	let defaultChannel = 'general';
    guild.channels.cache.forEach((channel) => {
        if (channel.type == 'text' && defaultChannel == 'general') {
            if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
                defaultChannel = channel;
            }
        }
    })

    const newserverjoinembed = new MessageEmbed()
        .setTitle('Hello!')
        .setDescription('Hello there! Thanks for inviting me to your server! Need help? Type `v!help`')
        .addField('Important Links:', `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=843428824385716244&permissions=8&scope=bot)\n[Support Server](https://discord.gg/xyqpAvyPgZ)`)
        .setColor('BLUE')
        .setTimestamp();
    defaultChannel.send(newserverjoinembed)
})


keepAlive();
client.login(process.env.TOKEN);

