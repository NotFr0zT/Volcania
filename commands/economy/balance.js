const { MessageEmbed } = require('discord.js')

const db = require('quick.db')

module.exports = {
    name: 'balance',
    category: 'Economy',
    description: 'Shows your balance!',
    aliases: ['bal', 'money'],
    usage: 'balance',
    userperms: [],
    botperms: [],
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.author;

        let bal = db.fetch(`balance_${user.id}`)

        if (bal === null) bal = 0;

        let bank = await db.fetch(`bank_${user.id}`)
        if (bank === null) bank = 0;

        let moneyEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
        message.lineReplyNoMention(moneyEmbed)
    }
}
