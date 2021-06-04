require('dotenv').config();
const keepAlive = require('./server');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
require('discord-reply');
const db = require('quick.db');
const client = new Client({ disableMentions: 'everyone', partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'], ws: { intents: Intents.ALL, properties: { $browser: "Discord iOS" } } });
require('discord-buttons')(client);

client.commands = new Collection();
client.aliases = new Collection();

['command', 'event'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on('guildCreate', async (guild) => {
    // let defaultChannel = 'general';
    // guild.channels.cache.forEach((channel) => {
    //     if (channel.type == 'text' && defaultChannel == 'general') {
    //         if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
    //             defaultChannel = channel;
    //         }
    //     }
    // })

    // db.set(`moderation_${guild.id}`, true)

    // defaultChannel.send(new MessageEmbed()
    //     .setTitle('Thank you for adding me!')
    //     .setDescription('Hello there! Thanks for inviting me to your server! Need help? Type `v!help`')
    //     .addField('Important Links:', `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=843428824385716244&permissions=8&scope=bot)\n[Support Server](https://discord.gg/xyqpAvyPgZ)\n [Github Repository](https://github.com/NotFr0zT/Volcania)`)
    //     .setColor('BLUE')
    //     .setFooter(`Note: Moderation is enabled by default | Turn it off by v!moderation off`)
    //     .setTimestamp()
    // )
    // const welcomebutton = new MessageButton()
    //     .setStyle('green')
    //     .setLabel('Hey there, im Volcania! Do you need help? Simply click me!')
    //     .setID('welcomebutton')
    // const msg = await defaultChannel.send('Hi', welcomebutton)
    // setTimeout(() => {
    //     msg.delete()
    // }, 20000)

})


keepAlive();

client.on('clickButton', async (button) => {
    if (button.id === 'button1') return button.channel.send('so you like green huh?').then(button.defer())
    if (button.id === 'button2') return button.channel.send('so you like red huh?').then(button.defer())
    //     if (button.id === 'welcomebutton') {
    //         button.channel.send(new MessageEmbed()
    //             .setTitle('Thank you for adding me!')
    //             .setDescription('Hello there! Thanks for inviting me to your server! Need help? Type `v!help`')
    //             .addField('Important Links:', `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=843428824385716244&permissions=8&scope=bot)\n[Support Server](https://discord.gg/xyqpAvyPgZ)\n [Github Repository](https://github.com/NotFr0zT/Volcania)`)
    //             .setColor('BLUE')
    //             .setTimestamp()
    //         ).then(button.defer())
})

client.login(process.env.TOKEN);

