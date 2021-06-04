const { MessageEmbed, MessageFlags } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');

module.exports = {
    name: 'moderation',
    category: 'Moderation',
    description: 'Enables moderation',
    aliases: ['enablemod', 'enablemoderation', 'mod'],
    usage: 'moderation [on | off]',
    example: 'moderation on',
    userperms: ['MANAGE_GUILD'],
    botperms: [],
    run: async (client, message, args) => {

        if (args[0]) {
            if (args[0] === 'on') {
                if (db.get(`moderation_${message.guild.id}`) === true) return message.channel.send(`Moderation is already enabled in **${message.guild.name}**! Type \`v!moderation off\` to turn it off!`)
                try {
                    db.set(`moderation_${message.guild.id}`, true)
                    message.channel.send(`Successfully set Moderation to **True** in \`${message.guild.name}\``)
                } catch {
                    message.channel.send('Failed to enable, please contact a developer in our [Support Server](https://discord.gg/xyqpAvyPgZ)')
                }
            } else if (args[0] === 'off')  {
                if (!db.get(`moderation_${message.guild.id}`) === true) return message.channel.send(`Moderation is already off in **${message.guild.name}**! Type \`v!moderation on\` to turn it on!`)
                try {
                    db.set(`moderation_${message.guild.id}`, false)
                    message.channel.send(`Successfully set Moderation to **False** in \`${message.guild.name}\``)
                } catch {
                    message.channel.send('Failed to disable, please contact a developer in our [Support Server](https://discord.gg/xyqpAvyPgZ)')
                }
            }
        } else {
            message.channel.send('Type `v!help moderation` for info on how to use it!')
        }

    }
}