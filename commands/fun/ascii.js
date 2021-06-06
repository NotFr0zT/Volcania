const { MessageEmbed, Client, Message } = require('discord.js');
// const figlet = require('figlet');
const { promisify } = require('util');
// const figletAsync = promisify(figlet)

module.exports = {
    name: 'ascii',
    category: 'Fun',
    description: 'Ascii art!',
    aliases: [],
    usage: 'ascii text',
    example: 'ascii I\'m just better',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        message.channel.send('Disabled due to glitches. New one coming soon')
    }
}