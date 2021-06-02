const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

module.exports = {
    name: 'clap',
    category: 'Fun',
    description: 'C👏l👏a👏p',
    aliases: [],
    usage: 'clap <string>',
    example: 'clap <string>',
    userperms: [],
    botperms: [],
    run: async (client, message, args) => {
        if (args.length < 1) return message.channel.send("Please provide some text to clapify")
    
        message.channel.send(args.join('👏'));
    }
}

