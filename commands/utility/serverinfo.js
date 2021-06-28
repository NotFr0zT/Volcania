const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    category: 'Utility',
    description: 'Sends the serverinfo',
    aliases: ['si'],
    usage: 'serverinfo',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const verlvl = {
            NONE: "Absolutely Nothing",
            LOW: "Low",
            MEDIUM: "Medium",
            HIGH: "High (╯°□°）╯︵ ┻━┻",
            VERY_HIGH: "Highest (ノಠ益ಠ)ノ彡┻━┻"
        }

        let inline = true
        let sicon = message.guild.iconURL;
        const member = message.member
        let serverembed = new MessageEmbed()
            .setColor("#00ff00")
            .setThumbnail(sicon)
            .setAuthor(message.guild.name)
            .addField("Name", message.guild.name, inline)
            .addField("ID", message.guild.id, inline)
            .addField("Owner", message.guild.owner, inline)
            .addField("Region", message.guild.region, inline)
            .addField("Verification Level", verlvl[message.guild.verificationLevel], inline)
            .addField("Members", `🧑‍🦲 ${message.guild.memberCount}`, inline)
            .addField("Roles", message.guild.roles.cache.size, inline)
            .addField("Channels", message.guild.roles.cache.size, inline)
            .addField("You Joined", `${moment(member.joinedTimestamp).format('LT')} ${moment(member.joinedTimestamp).format('LL')} ${moment(member.joinedTimestampz).fromNow()}`)
            .setFooter(`Created ${moment(message.guild.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - message.guild.createdTimestamp) / 86400000)} day(s) ago`);

        message.channel.send(serverembed);
    }
}