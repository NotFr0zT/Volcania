//==========Important Modules==========//
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
//==========Code==========//
module.exports = {
    name: 'warnings',
    category: 'Moderation',
    description: 'Show user\'s warnings',
    aliases: ['warnings', 'listwarnings', 'list-warnings', 'list-warns', 'warning'],
    usage: 'warnings <user>',
    example: 'warn @yourmum',
    userperms: [],
    botperms: [],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!user) return message.reply('Please mention the user')
        let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`)
        if (warnings === null || warnings === 0) warnings = '0'
        const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Warnings`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`<@${user.id}> Has **${warnings}** Warnings`)
        message.reply(embed)
    }
}