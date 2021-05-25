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
    }
}