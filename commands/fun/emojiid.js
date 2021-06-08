const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'emojiid',
    category: 'Fun',
    description: 'Get ID of emojis',
    aliases: ['eid'],
    usage: 'emojiid <emoji>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const name = args.join(" ");
        const emoji = message.guild.emojis.cache.find(r => r.name.replace(':', ' ') === name);
        if (!name) {
            return message.channel.send("Please type the emoji name")
        }
        if (!emoji) {
            return message.channel.send("Couldn't find the Emojis with the provided name. Please make sure the Emoji name is correct and is in the guild!");
        }
        message.channel.send(`\`\`\`${emoji}\`\`\``)
    }
}