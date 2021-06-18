<<<<<<< HEAD
const { parseDur } = require('../../functions')
const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'uptime',
    category: 'Utility',
    description: 'Displays the bots time online',
    aliases: ['ontime'],
    usage: 'uptime',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
            .setTimestamp()
            .setDescription(`Online for: ${parseDur(client.uptime)}`)
            .setFooter('Note: The time resets after every commit.')
            .setTitle('Uptime')
            .setColor('ORANGE')
        message.channel.send(embed)


    }
}
=======
const moment = require("moment");
const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'uptime',
	aliases: ['uptime'],
	category: 'Utility',
	description: 'Check Bot\'s uptime',
	usage: 'uptime',
	example: 'uptime',
	userperms: [],
	botperms: [],
	run: async (client, message, args, prefix) => {
      require("moment-duration-format");
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")
      const embed = new MessageEmbed()
      .setTitle('Uptime')
      .setDescription(`Bot\'s uptime is: ${duration}`)
      .setTimestamp()
      message.channel.send(embed)
    }
};
>>>>>>> 25c7ed8487d2ae3053db00bd94aeb122731de4f9
