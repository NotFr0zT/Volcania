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