const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
    name: 'unlock',
    aliases: ['unlockchannel'],
    category: 'Moderation',
    description: 'Unlock\'s the mentioned channel',
    usage: 'unlock <#channel>',
    userperms: ['MANAGE_CHANNELS'],
    botperms: [],
    run: async (client, message, args, prefix) => {
        const channel = message.mentions.channels.first() ? message.mentions.channels.first() : args[0];

        if (!channel) return message.channel.send('Mention a channel')
   
        let mm;

       if (channel === args[0]) mm = await message.guild.channels.cache.get(args[0]); else mm = await message.mentions.channels.first();
   
       mm.updateOverwrite(message.guild.roles.everyone.id, {
           SEND_MESSAGES: null
       }).then(() => {
           const done = new MessageEmbed()
           .setColor('GREEN')
           .setDescription(`**${mm.name}** has been unlocked`)
   
           message.channel.send(done)

           let modchannel = db.fetch(`modlog_${message.guild.id}`)
            if (modchannel === null || undefined) return;

            if (!modchannel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "Unlock")
                .addField("**Channel**", channel)
                .addField("**ID**", channel.id)
                .addField("*Unlocked By**", message.author.username)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.find(modchannel)
            if (!sChannel) return;
            sChannel.send(embed)
       }).catch(() => {
           const failed = new MessageEmbed()
           .setColor('RED')
           .setDescription(`Failed to unlock **${mm.name}**`)
   
           message.channel.send(failed)
       })
    }
}