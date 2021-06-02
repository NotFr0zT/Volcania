const express = require('express');
const server = express();

server.get('/', (req, res) => {
	res.send('Your bot is alive!');
});

function keepAlive() {
	server.listen(8080, () => {
		console.log('Server is Ready!');
	});
}

module.exports = keepAlive;

/*
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')

module.exports = {
	name: '',
	category: '',
	description: '',
	aliases: [],
	usage: '',
	example: '',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {

	}
}
*/