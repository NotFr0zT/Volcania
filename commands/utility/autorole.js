const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'autorole',
    category: 'Welcome',
    description: 'Sets the autorole for your guild',
    aliases: ['welcomerole', 'welrole'],
    usage: 'autorole <role>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        message.channel.send('Coming soon...')
    }
}