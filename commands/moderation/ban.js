const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')

module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bans a user',
    aliases: [],
    usage: 'ban <user> [reason]',
    example: 'ban @Fr0zT For being cool',
    userperms: ['BAN_MEMBERS'],
    botperms: [],
    run: async (client, message, args) => {
        try {
            if (!args[0]) return message.channel.send("**Please Provide A User To Ban!**")

            if (!db.fetch(`moderation_${message.guild.id}`) === true) return message.channel.send(`Moderation is not enabled in **${message.guild.name}**! \`Type v!moderation on\` to turn it on!`)

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**User Is Not In The Guild**");
            if (banMember === message.member) return message.channel.send("**You Cannot Ban Yourself**")

            let reason = args.slice(1).join(" ") || 'No reason provided.';

            if (!banMember.bannable) return message.channel.send("**Cant Ban That User**")
            try {
                message.guild.members.ban(banMember)
                banMember.send(`**Hello, You Have Been Banned From ${message.guild.name} for - ${reason}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${banMember.user.username}** has been banned for ${reason}`)
                message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${banMember.user.username}** has been banned`)
                message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}