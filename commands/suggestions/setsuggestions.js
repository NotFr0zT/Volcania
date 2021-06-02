const { MessageEmbed } = require('discord.js')

const db = require('quick.db')

module.exports = {
    name: 'setsuggestion',
	category: 'Suggestions',
	description: 'Sets the suggestion channel for your server!',
	aliases: ['setchannel', 'setsuggestionchannel', 'setsuggestionschannel'],
	usage: 'setsuggestion <#channel>',
    example: 'setsuggestion #suggestions',
	userperms: ['MANAGE_GUILD'],
	botperms: ['MANAGE_CHANNELS'],
	run: async (client, message, args) => {
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.lineReplyNoMention(`Please mention a channel.`);
        if (Channel.type === "voice") return message.lineReplyNoMention(`Please mention a text channel!`);

        await db.set(`suggestion_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`Successfully set the suggestions channel to <#${Channel.id}>.`)

        return message.lineReplyNoMention(Embed);
    }
}