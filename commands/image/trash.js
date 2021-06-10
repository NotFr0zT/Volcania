const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'trash',
    category: 'Image',
    description: 'Yet another image manipulation command..',
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
        const mention = message.mentions.members.first();
        if (!mention) {
            return message.channel.send("You need to mention Someone");
        }
        const user1 = message.author;
        const avatar1 = user1.displayAvatarURL({ size: 512, format: "png" });
        const avatar2 = mention.user.displayAvatarURL({ size: 512, format: "png" });

        await message.channel.send({ files: [{ attachment: `https://api.alexflipnote.dev/trash?face=${avatar1}&trash=${avatar2}`, name: 'file.png' }] })
    }
}