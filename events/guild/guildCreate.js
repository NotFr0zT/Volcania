const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');

module.exports = async (guild) => {
    let defaultChannel = 'general';
    guild.channels.cache.forEach((channel) => {
        if (channel.type == 'text' && defaultChannel == 'general') {
            defaultChannel = channel
        }
    })

    db.set(`moderation_${guild.id}`, true)

    defaultChannel.send(new MessageEmbed()
        .setTitle('Thank you for adding me!')
        .setDescription('Hello there! Thanks for inviting me to your server! Need help? Type `v!help`')
        .addField('Important Links:', `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=843428824385716244&permissions=8&scope=bot)\n[Support Server](https://discord.gg/xyqpAvyPgZ)\n [Github Repository](https://github.com/NotFr0zT/Volcania)`)
        .setColor('BLUE')
        .setFooter(`Note: Moderation is enabled by default | Turn it off by v!moderation off`)
        .setTimestamp()
    )
}