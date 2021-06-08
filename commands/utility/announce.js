const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'announce',
    category: 'Utility',
    description: 'Make an announcement in your server',
    aliases: [],
    usage: 'announce <#channel> <announcement>',
    userperms: ['MANAGE_CHANNELS'],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const anchannel = message.mentions.channels.first();
        if (!anchannel) {
            return message.channel.send("`Usage: v!announce <channel> <msg>`")
        }
        if (!args.slice(1).join(" ")) {
            return message.channel.send("Please add some text to make an Announcement")
        }

        let embed = new MessageEmbed()
            .setTitle(`<a:announcement:733341856674611230> New Server Announcement`)
            .setDescription(args.slice(1).join(" "), { allowedMentions: { parse: ["users"] } })
            .setColor("RANDOM")
            .setFooter(`Announcement by ${message.author.username}`);
        anchannel.send(embed);

        let anembed = new MessageEmbed()
            .setTitle("Done!")
            .setDescription(`Announcement has been sent to ${anchannel}`)
            .setColor("RANDOM");

        message.channel.send(anembed);
        message.delete();
    }
}