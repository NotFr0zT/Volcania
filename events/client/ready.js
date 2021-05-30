const { PREFIX } = process.env;

module.exports = async (client) => {
	const botStatus = [
		`${client.guilds.cache.size} servers and helping ${client.users.cache.size} users!`,
	];

	setInterval(function() {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(`${status}`, { type: 'WATCHING', status: 'dnd' });
	}, 30000);

	console.log(`Logged in as ${client.user.tag}`);
	console.log('Prefix:', PREFIX);
};