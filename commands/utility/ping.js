const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
	name: 'ping',
	category: 'Utility',
	description: 'Returns the bot\'s latency and API ping.',
	aliases: ['latency'],
	usage: 'ping',
	example: 'ping',
	userperms: [],
	botperms: [],
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	run: async (client, message, args) => {
		message.channel.send(new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Pinging...')
		).then((msg) => {
			const ping = msg.createdTimestamp - message.createdTimestamp
			const pEmbed = new MessageEmbed()
				.setTitle('Pong!')
				.setColor(ping < 350 ? "GREEN" : ping < 500 && ping > 350 ? "YELLOW" : "RED")
				.addField('📨 Bot Latency', `${Math.floor(ping)}ms`)
				.addField('🛰️ API Latency', `${client.ws.ping}ms`)
				.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
				.setThumbnail(client.user.avatarURL({ dynamic: true }))
				.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
			msg.edit(pEmbed);
		});
	}
};