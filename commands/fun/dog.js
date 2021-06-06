const { MessageEmbed, Client, Message } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');
const pets = require('pets.js')

module.exports = {
    name: 'dog',
    category: 'Fun',
    description: 'Woof Woof!',
    aliases: ['woof'],
    usage: 'dog',
    example: 'dog',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        let picture = await pets('dog')
        const embed = new MessageEmbed()
            .setColor("#00ff00")
            .setAuthor(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setImage(picture)
            .setFooter('That\'s cute!')

        message.channel.send(embed)
    }
}