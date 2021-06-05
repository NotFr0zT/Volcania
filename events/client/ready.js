const { PREFIX } = process.env;

module.exports = async (client) => {

	let totalMembers = 0;

	for (const guild of client.guilds.cache) {
		totalMembers += (await guild[1].members.fetch()).size;
	}

	const botStatus = [
		`${client.guilds.cache.size} Servers!`,
		`${totalMembers} Users!`,
		`${client.commands.size} Commands!`
	];

	setInterval(function () {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setPresence({ activity: { type: 'STREAMING', url: "https://www.twitch.tv/fr0zttt", name: status } });
	}, 30000);

	console.log(`Logged in as ${client.user.tag}`);
	console.log('Prefix:', PREFIX);
};