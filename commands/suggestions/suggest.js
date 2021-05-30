const { MessageEmbed } = require('discord.js')

const db = require('quick.db')


module.exports = {
    name: 'suggest',
    category: 'Suggestions',
    description: 'Suggests something!',
    aliases: [],
    usage: 'suggest <string>',
    userperms: [],
    botperms: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {

        let channel = await db.fetch(`suggestion_${message.guild.id}`);
        if (channel === null) return message.lineReplyNoMention(`No suggestion channel set. Use\n\n\`\`\`v!setsuggestion <#channel>\`\`\``);

        const suggestionQuery = args.join(" ");
        if (!suggestionQuery) return message.lineReplyNoMention("Please Suggest Something.");

        const embed = new MessageEmbed()

            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${suggestionQuery}`)
            .setColor("00FFFF")
            .setFooter(`Status: pending | ID ${message.id}`)
            .setTimestamp();

        const done = new MessageEmbed()
            .setDescription(` Your suggestion was successfully sent to <#${channel}>!`)
            .setColor("BLUE")

        message.lineReplyNoMention(done)
        let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)

        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }
}