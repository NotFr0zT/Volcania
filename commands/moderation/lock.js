const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'lock',
    aliases: ['lockchannel'],
    category: 'Moderation',
    description: 'Lock\'s the mentioned channel',
    usage: 'lock <#channel>',
    userperms: [],
    botperms: [],
    run: async (client, message, args, prefix) => {
        const channel = message.mentions.channels.first() ? message.mentions.channels.first() : args[0];

        if (!channel) return message.channel.send('Mention a channel')

        let mm;

        if (channel === args[0]) mm = await message.guild.channels.cache.get(args[0]); else mm = await message.mentions.channels.first();

        mm.updateOverwrite(message.guild.roles.everyone.id, {
            SEND_MESSAGES: false
        }).then(() => {
            const done = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**${mm.name}** has been locked`)

            message.channel.send(done)
        }).catch(() => {
            const failed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Failed to lock **${mm.name}**`)

            message.channel.send(failed)
        })
    }
}