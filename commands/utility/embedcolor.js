const { MessageEmbed, Client, Message } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');

module.exports = {
    name: 'embedcolor',
    category: 'Utility',
    description: 'Sets the default embed color for your guild',
    aliases: ['ec'],
    usage: 'embedcolor <color>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        // const color = db.fetch(`embedcolor_${message.guild.id}`)
        message.channel.send('Work in progress')
    }
}