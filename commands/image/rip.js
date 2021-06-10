const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'rip',
    category: 'Image',
    description: 'R.I.P Any user..',
    aliases: [],
    usage: '',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const mention = message.mentions.members.first() || message.member;


        message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/grave?user=${mention.user.avatarURL()}`, name: "rip.png" }] });
    }
}