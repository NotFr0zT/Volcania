const { MessageEmbed, Discord } = require('discord.js')

const db = require('quick.db')

module.exports = {
    name: 'reply',
    category: 'Suggestions',
    description: 'Replies to a suggestion!',
    aliases: [],
    usage: 'reply <suggestion id>',
    example: 'reply 849698926752910586',
    userperms: ['MANAGE_GUILD'],
    botperms: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {
        let channel = await db.fetch(`suggestion_${message.guild.id}`);
        if (channel === null) return message.channel.send(`No suggestion channel set. Use\n\n\`\`\`v!setsuggestion <#channel>\`\`\``);
        if (channel === null) return;

        const rgx = /^(?:<@!?)?(\d+)>?$/;
        const messageID = args[0];
        const replyQuery = args.slice(1).join(' ') || 'No reason';

        const number = new MessageEmbed()
            .setDescription(`I don't think that was a Message ID!`)
            .setColor('FF2052')

        const id = new MessageEmbed()
            .setDescription(`You forgot to specify Message ID!`)
            .setColor('FF2052')

        const query = new MessageEmbed()
            .setDescription(`You forgot to specify the Reply!`)
            .setColor('FF2052')

        const reply = new MessageEmbed()
            .setDescription(` Successfully Replied the Suggestion.`)
            .setColor('00FFFF')

        const noChannel = new MessageEmbed()
            .setDescription(`No Suggestion Channel found!`)
            .setColor('FF2052')

        const noMessage = new MessageEmbed()
            .setDescription(` Didn't find any Message with that ID!`)
            .setColor('FF2052')

        if (!messageID) return message.lineReplyNoMention(id);
        if (!rgx.test(messageID)) return message.lineReplyNoMention(number);
        if (!replyQuery) return message.lineReplyNoMention(query)

        try {
            const suggestionChannel = message.guild.channels.cache.get(channel)
            if (!suggestionChannel) return message.lineReplyNoMention(noChannel)
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
                const noMessage = new MessageEmbed()
                    .setDescription(`Didn't find any Message with that ID!`)
                    .setColor('FF2052')
                return message.lineReplyNoMention(noMessage);
            })

            const data = suggestedEmbed.embeds[0];

            const replyEmbed = new MessageEmbed()
                .setAuthor(`${data.author.name}`, data.author.iconURL)
                .setTitle('Suggestion')
                .setDescription(`${data.description}`)
                .setColor('BLUE')
                .addField(`Reply from ${message.author.tag}`, replyQuery)
                .setFooter(`Status: replied | ID: ${suggestedEmbed.id}`)
                .setTimestamp();

            suggestedEmbed.edit(replyEmbed)
            suggestedEmbed.reactions.removeAll();
            message.lineReplyNoMention(reply)

            const user = await client.users.cache.find((u) => u.tag === data.author.name)

            const embed = new MessageEmbed()
                .setDescription(`You have got a Reply over your [suggestion](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})`)
                .setColor('BLUE')
            user.send(embed)

        } catch (err) {
            console.log(err)
            return;
        }
    }
}