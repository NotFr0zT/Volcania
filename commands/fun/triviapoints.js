const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'triviapoints',
    category: 'Fun',
    description: 'Check your Trivia Points',
    aliases: ['triviapoint', 'points', 'point'],
    usage: 'triviapoints',
    example: 'triviapoints',
    userperms: [],
    botperms: [],
    run: async (client, message, args) => {
    let member = message.mentions.users.first() || message.author;
    const points = new MessageEmbed()
    .setTitle("Your Trivia Points are:")
    .setDescription(db.get(`points_${member.id}`))
    .setColor("RANDOM")
    message.reply(points)
  }
}