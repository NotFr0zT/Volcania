const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
	name: 'cnjoke',
	category: 'Fun',
	description: 'Gives you a joke',
	aliases: ['chuck', 'chucknorris', 'chucknorrisjoke'],
	usage: 'joke',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
        giveMeAJoke.getRandomCNJoke(function (joke) {
            message.channel.send(joke)
        })
	}
}