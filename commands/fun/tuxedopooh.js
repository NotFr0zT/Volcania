const { MessageAttachment, Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'pooh',
    category: 'Fun',
    description: 'pooooooooooh',
    aliases: ['tuxedopooh', 'tuxedo'],
    usage: 'pooh <text1> <text2>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const split = args.join(" ").split("|")
        const text1 = split[0];
        const text2 = split[1];
        if (!text1 || !text2) return message.reply("You need 2 sentences separated with `|` for this to work.")
        const Image = `https://api.popcatdev.repl.co/pooh?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`
        // const poo = new MessageAttachment(Image, "tuxedopooh.png");
        let embed = new MessageEmbed()
            .setTitle('pooooooooooh')
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setImage(Image)
            .setColor('BLUE')
            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send(embed)
    }
}