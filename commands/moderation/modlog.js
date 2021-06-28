const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')

module.exports = {
    name: 'modlogchannel',
    category: 'Moderation',
    description: 'Sets a channel to send moderation logs in',
    aliases: ['setm', 'sm', 'smc', 'setmodlog'],
    // usage: 'modlogchannel <channel mention | channel ID | channel name>',
    example: 'modlog #moderation-logs',
    userperms: ['MANAGE_GUILD'],
    botperms: [],
    run: async (client, message, args) => {
        if (!db.fetch(`moderation_${message.guild.id}`) === true) return message.channel.send(`Moderation is not enabled in **${message.guild.name}**! \`Type v!moderation on\` to turn it on!`)
        if (!args[0]) {
            let b = await db.fetch(`modlog_${message.guild.id}`);
            let channelName = message.guild.channels.cache.get(b);
            if (message.guild.channels.cache.has(b)) {
                return message.channel.send(
                    `Modlog Channel Set In This Server Is \`${channelName.name}\`!`
                );
            } else
                return message.channel.send(
                    "Please Enter A Channel Name or ID To Set!"
                );
        }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("Please Enter A Valid Text Channel!");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("This Channel is Already Set As Modlog Channel!")
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("Modlog Channel Set!")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`Modlog Channel Has Been Set Successfully in \`${channel.name}\`!`)
            }
        } catch {
            return message.channel.send("Error - `Missing Permissions Or Channel Is Not A Text Channel!`");
        }
    }
}