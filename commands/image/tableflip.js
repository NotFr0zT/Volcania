const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'tableflip',
    category: 'Image',
    description: 'Another image manipulation command',
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
        const avatar = mention.user.displayAvatarURL({ size: 512, format: "png" });

        message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/tableflip?user=${avatar}`, name: "tableflip.png" }] });
    }
}