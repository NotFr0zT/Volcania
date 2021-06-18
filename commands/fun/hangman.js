const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'hangman',
    category: 'Fun',
    description: 'Plays hangman',
    aliases: ['hm'],
    usage: 'hangman <channel> <word>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const { hangman } = require('reconlx')

        const channel = message.mentions.channels.first();

        if (!channel) return message.channel.send('Whooops, use `v!hangman <channel> <word>`')

        if (!args.slice(1).join(' ')) return message.channel.send('Whooops, use `v!hangman <channel> <word>`')


        // making hangman
        const hang = new hangman({
            message: message,
            word: args.slice(1).join(" "),
            client: client,
            channelID: message.mentions.channels.first().id,
        });

        // starting the game
        hang.start();
    }
}