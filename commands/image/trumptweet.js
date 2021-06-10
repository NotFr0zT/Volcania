const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = {
    name: 'trumptweet',
    category: 'Image',
    description: '',
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
        const tweet = args.join(" ");
        if (!tweet) {
            return message.channel.send("Mr. President Says: \`What to tweet ?\`")
        }
        if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';

        try {
            const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + tweet);
            const img = (await res.json()).message;
            message.channel.send({ files: [{ attachment: img, name: "trumptweet.png" }] });
        } catch (err) {
            console.log(err);
        }
    }
}