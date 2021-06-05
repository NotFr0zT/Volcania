const { MessageEmbed, Client, Message } = require('discord.js');
const figlet = require('figlet');
const { promisify } = require('util');
const figletAsync = promisify(figlet)

module.exports = {
    name: 'ascii',
    category: 'Fun',
    description: 'Ascii art!',
    aliases: [],
    usage: 'ascii text',
    example: 'ascii I\'m just better',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        let content = args.join(' ')

        if (!content) return message.channel.send('Give me sum text bro, I cant work with nothing smh')

        let result = await figletAsync(content);


            if (content.length > 25)
                return message.channel.send('Please make it shorter, the limit around here is 25')

            message.channel.send('```' + result + '```')
    }
}