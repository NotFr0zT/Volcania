const { MessageEmbed, Discord } = require('discord.js')

module.exports = {
    name: 'invite',
    category: 'Info',
    description: 'Sends the invite for the bot!',
    aliases: ['i'],
    usage: 'invite',
    userperms: [],
    botperms: ['SEND_MESSAGES'],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription('[Invite Link](https://discord.com/api/oauth2/authorize?client_id=843428824385716244&permissions=8&scope=bot)\n[Support Server](https://discord.gg/xyqpAvyPgZ)')
        message.lineReplyNoMention(embed)
    }
}