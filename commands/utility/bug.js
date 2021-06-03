const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')

module.exports = {
	name: 'bug',
	category: 'Utility',
	description: 'Report a bug to the developers',
	aliases: ['bugreport'],
	usage: 'bug <bug>',
    example: 'bug The v!help command doesnt work',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
        let bugText = args.join(" ");
        if (!bugText) return message.reply("I can't send an empty bug report!");
        message.reply("Thank you for submitting a bug, hopefully it won't require major surgery :grimacing:");
        const bug = `( <@&846773126292832327> )\n\n**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n\n"${bugText}"\n\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
        let embed = new MessageEmbed()
            .setTitle("Bug Report")
            .setDescription(bug)
            .setColor('RED');
    
            const channel = '846773166603763753'
        client.channels.cache.get(channel).send(embed)
            .catch(console.error);
	}
}