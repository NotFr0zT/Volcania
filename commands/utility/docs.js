const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');
const axios = require('axios')

module.exports = {
    name: 'docs',
    category: 'Utility',
    description: 'Displays Discord.JS documentation',
    aliases: ['djsdocs'],
    usage: 'docs <string>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
            args
        )}`
        if (!args.length) {
            return message.channel.send('give me sth to work with')
        }

        axios
            .get(uri)
            .then((embed) => {
                const { data } = embed

                if (data && !data.error) {
                    message.channel.send({ embed: data })
                } else {
                    message.reply('Could not find that documentation')
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }
}