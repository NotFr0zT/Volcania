const { validatePermissions } = require('../../functions');
const { PREFIX, OWNER } = process.env;
const { MessageEmbed } = require('discord.js')

module.exports = async (client, message) => {

	// const mentionMember = message.mentions.members.first();
	// if(mentionMember) {
	// 	const data = afk.get(mentionMember.id);
	// 	if(data) {
	// 		const [ timestamp, reason ] = data;
	// 		const timeAgo = moment(timestamp).fromNow();

	// 		message.channel.send(new MessageEmbed()
	// 		.addField(`${mentionMember} is currently afk!`, `${timeAgo}\n${reason}`)
	// 		)
	// 	}
	// }
	// const getData = afk.get(message.author.id);
	// if(!getData) {
	// 	afk.delete(message.author.id);
	// 	message.reply(`Your afk has been removed!`)
	// }

	if (message.author.bot) return;
	if (!message.guild) return;

	const prefix = PREFIX;
	let totalMembers = 0;

	for (const guild of client.guilds.cache) {
		totalMembers += (await guild[1].members.fetch()).size;
	}

	if (message.content === 'v!users') return message.channel.send(totalMembers)
	if (message.content === 'v!servers') return message.channel.send(client.guilds.cache.size)
	if (message.content === 'v!commands') return message.channel.send(client.commands.size)

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
	}

	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	if (command) {
		if (command.userperms.length > 0 || command.botperms.length > 0) {
			if (typeof command.userperms === 'string') {
				command.userperms = command.userperms.split();
				validatePermissions(command.userperms);
			}

			for (const permission of command.userperms) {
				if (permission === 'OWNER' && message.member.id !== OWNER) {
					return;
				}
				else if (!message.member.hasPermission(permission)) {
					return message.channel.send(
						`🛑 Insufficient Permission! \`${permission}\` required.`,
					);
				}
			}

			if (typeof command.botperms === 'string') {
				command.botperms = command.botperms.split();
				validatePermissions(command.botperms);
			}

			for (const permission of command.botperms) {
				if (!message.guild.me.hasPermission(permission)) {
					return message.channel.send(
						`🛑 Insufficient Permission! I require \`${permission}\`.`,
					);
				}
			}
		}
		command.run(client, message, args, prefix);
	}
};