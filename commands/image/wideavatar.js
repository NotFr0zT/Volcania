const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'wideavatar',
    category: 'Image',
    description: 'Get a widened avatar of a user',
    aliases: ['wa'],
    usage: 'wideavatar <user>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const mention = message.mentions.members.first() || message.member;
        const avatar = mention.user.displayAvatarURL({ dynamic: true, size: 2048, format: "gif" });

        await message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/wide?image=${avatar}`, name: "wideavatar.gif" }] });
    }
}