const { MessageEmbed, Client, Message } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');

module.exports = {
    name: '8ball',
    category: 'Fun',
    description: 'Decides your faith',
    aliases: ['8b'],
    usage: '8ball <question>',
    example: '8ball Should I jump off a bridge',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const responses = [
            ':8ball: Absolutly.', ':8ball: Absolutly not.', ':8ball: It is true.', ':8ball: Impossible.', ':8ball: Of course.', ':8ball: I do not think so.', ':8ball: It is true.', ':8ball: It is not true.', ':8ball: I am very undoubtful of that.', ':8ball: I am very doubtful of that.', ':8ball: Sources point to no.', ':8ball: Theories prove it.', ':8ball: Reply hazy try again', ':8ball: Ask again later', ':8ball: Better not tell you now', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again'
        ];

        if (!args[0]) return message.channel.send('Cant answer nothing bruh')

        const random = Math.floor(Math.random() * responses.length);
        message.lineReplyNoMention(new MessageEmbed().setColor("RANDOM").setDescription(`\n${responses[random]}`))
    }
}