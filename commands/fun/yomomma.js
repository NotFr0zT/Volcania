const yoMomma = require('yo-mamma').default;
const { MessageEmbed, Client, Message } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');

module.exports = {
    name: 'yomomma',
    category: 'Fun',
    description: 'Yo momma',
    aliases: ['yomom', 'mom', 'ym'],
    usage: 'yomomma',
    example: 'yomomma',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        message.channel.send(yoMomma())
    }
}