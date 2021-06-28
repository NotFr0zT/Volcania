//==========Important Modules==========//
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
//==========Code==========//
module.exports = {
    name: 'warn',
    category: 'Moderation',
    description: 'Warn a user',
    aliases: ['warn'],
    usage: 'warn <user> (reason)',
    example: 'warn @yourmum she slapped me',
    userperms: ["KICK_MEMBERS", "BAN_MEMBERS"],
    botperms: [],
    run: async (client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) {
            const warnError = new MessageEmbed()
                .setDescription("You Do Not have Permission to Warn someone")
                .setColor("RANDOM");
            return message.reply(warnError);
        };
        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!user) return message.reply('Please mention the user')
        let reason = args.slice(1).join(' ')
        if (!reason) reason = 'Not Specified'
        const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} has been warned`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`Reason: **${reason}** | By <@${message.author.id}>`)
        message.reply(embed)
        user.user.send(`You were warned in ${message.guild.name} | Reason: **${reason}** | By <@${message.author.id}>`)
        db.add(`warns_${message.guild.id}_${user.id}`, 1)
    }
};