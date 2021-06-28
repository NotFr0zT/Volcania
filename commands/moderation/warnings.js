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
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find((e) => e.username.includes(args.join(' ')) || e.tag.includes(args.join(' '))) || (message.guild ? message.guild.members.cache.find((e) => e.nickname === args.join(' ')) : undefined) || (args[0] ? await client.users.fetch(args[0]).catch(() => { }) : undefined) || message.author || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())


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