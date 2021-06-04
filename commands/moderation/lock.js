const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');

module.exports = {
    name: 'lock',
    category: 'Moderation',
    description: 'Locks a channel',
    aliases: [],
    usage: 'lock [channel]',
    example: 'lock #general',
    userperms: ['MANAGE_CHANNELS'],
    botperms: [],
    run: async (client, message, args) => {

        if (!db.fetch(`moderation_${message.guild.id}`) === true) return message.channel.send(`Moderation is not enabled in **${message.guild.name}**! \`Type v!moderation on\` to turn it on!`)

        let channel = message.channel || message.mentions.channels.first() || message.guild.channels.cache.find(args[0]);

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);
            message.channel.send('Something failed! Please contact the developers in the [Support Server](https://discord.gg/xyqpAvyPgZ)')
        }

        message.channel.send(`Done | Channel Locked!`);
    }
}