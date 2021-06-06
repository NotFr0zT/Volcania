const { MessageEmbed, Client, Message } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');
const pets = require('pets.js')

module.exports = {
    name: 'cat',
    category: 'Fun',
    description: 'Meow Meow!',
    aliases: ['meow'],
    usage: 'cat',
    example: 'cat',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        let picture = await pets('cat')
        const embed = new MessageEmbed()
            .setColor("#00ff00")
            .setAuthor(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setImage(picture)
            .setFooter('That\'s cute!')

        message.channel.send(embed)
    }
}