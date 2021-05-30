const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear',
    aliases: [],
    category: 'Moderation',
    description: 'Clear\'s a specified amount of messages',
    usage: 'clear <integer>',
    userperms: ['MANAGE_CHANNELS'],
    botperms: [],
    run: async (client, message, args, prefix) => {

        let deleteAmount;

        if (isNaN(args[0]) || parseInt(args[0] <= 0)) return message.lineReplyNoMention('Please put a valid number!').then((msg) => {
            msg.delete({ timeout: 2 * 1000 })
        })

        if (parseInt(args[0] > 100)) {
            return message.lineReplyNoMention('You can only delete 100 messages at a time!').then((msg) => {
                msg.delete({ timeout: 2 * 1000 })
            })
        }
        else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount + 1, true);
        message.channel.send(`Successfully deleted **${deleteAmount}** messages!`).then((msg) => {
            msg.delete({ timeout: 2 * 1000 })
        })
    }
}