//==========Important Modules==========//
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
//==========Code==========//
module.exports = {
    name: 'removewarn',
    category: 'Moderation',
    description: 'Remove a warning from a user',
    aliases: ['removewarn', 'unwarn', 'removewarning'],
    usage: 'removewarn <user>',
    example: 'removewarn @yourmum',
    userperms: ["KICK_MEMBERS", "BAN_MEMBERS"],
    botperms: [],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!user) return message.reply('Please mention the user')
        const embed = new MessageEmbed()
            .setAuthor(`${user.user.username}`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`Warning Removed`)
        message.reply(embed)
        user.user.send(`Your warning was removed in ${message.guild.name} | By <@${message.author.id}>`)
        db.subtract(`warns_${message.guild.id}_${user.id}`, 1)
    }
};