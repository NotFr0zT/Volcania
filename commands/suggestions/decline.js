const { MessageEmbed, Discord } = require('discord.js')

const db = require('quick.db')

module.exports = {
    name: 'decline',
    category: 'Suggestions',
    description: 'Declines a suggestion!',
    aliases: [],
    usage: 'decline <suggestion id>',
    userperms: ['MANAGE_GUILD'],
    botperms: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {
        let channel = await db.fetch(`suggestion_${message.guild.id}`);
        if (channel === null) return message.lineReplyNoMention(`No suggestion channel set. Use\n\n\`\`\`v!setsuggestion <#channel>\`\`\``);
        if (channel === null) return;

        const rgx = /^(?:<@!?)?(\d+)>?$/;
        const messageID = args[0];
        const replyQuery = args.slice(1).join(' ');

        const number = new MessageEmbed()
            .setDescription(`Please use a valid message ID.`)
            .setColor("FF2052")

        const id = new MessageEmbed()
            .setDescription(`You forgot to specify a message ID.`)
            .setColor("FF2052")

        const query = new MessageEmbed()
            .setDescription(`<You forgot to specify the reason to decline this suggestion.`)
            .setColor("FF2052")

        const reply = new MessageEmbed()
            .setDescription(`Successfully declined the suggestion.`)
            .setColor("00FFFF")

        const noChannel = new MessageEmbed()
            .setDescription('No suggestion channel found.')
            .setColor("FF2052")

        const noMessage = new MessageEmbed()
            .setDescription(`I cannot find any message with that id, please use a valid message ID.`)
            .setColor("FF2052")

        if (!messageID) return message.lineReplyNoMention(id);
        if (!rgx.test(messageID)) return message.lineReplyNoMention(number);
        if (!replyQuery) return message.lineReplyNoMention(query)

        try {
            const suggestionChannel = message.guild.channels.cache.get(channel)
            if (!suggestionChannel) return message.lineReplyNoMention(noChannel)

            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
                const noMessage = new MessageEmbed()
                    .setDescription(`I cannot find any message with that ID, please use a valid message ID.`)
                    .setColor("FF2052")
                return message.lineReplyNoMention(noMessage);
            })

            const data = suggestedEmbed.embeds[0];

            const replyEmbed = new MessageEmbed()
                .setAuthor(`${data.author.name}`, `${data.author.iconURL}`)
                .setDescription(`**Suggestion:**\n${data.description}`)
                .setColor("RED")
                .addField(`Declined by ${message.author.tag}`, replyQuery)
                .setFooter("Status: declined")
                .setTimestamp();

            suggestedEmbed.edit(replyEmbed)
            suggestedEmbed.reactions.removeAll();
            message.lineReplyNoMention(reply)

            const user = await client.users.cache.find((u) => u.tag === data.author.name)

            const embed = new MessageEmbed()
                .setDescription(`Your [suggestion](https://discord.com/channels/${message.guild.id}/${channel}/${messageID}) has been declined.`)
                .setColor("RED")
            user.send(embed)

        } catch (err) {
            console.error(err);
            return;
        }
    }
}