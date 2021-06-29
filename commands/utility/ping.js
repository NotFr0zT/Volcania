const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	category: 'Utility',
	description: 'Returns the bot\'s latency and API ping.',
	aliases: ['latency'],
	usage: 'ping',
	example: 'ping',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		message.channel.send(new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Pinging...')
		).then((msg) => {
			const pEmbed = new MessageEmbed()
				.setTitle('🏓 Pong!')
				.setColor(msg.createdTimestamp - message.createdTimestamp < 350 ? "GREEN" : msg.createdTimestamp - message.createdTimestamp < 500 && msg.createdTimestamp - message.createdTimestamp > 350 ? "YELLOW" : "RED")
				.setDescription([
					`📨 • **Latency: \`${Math.floor(msg.createdTimestamp - message.createdTimestamp,)}\`ms**`,
					`🛰️ • **API Latency: \`${client.ws.ping}\`ms**`
				])
			msg.edit(pEmbed);
		});
	}
};