const { MessageEmbed } = require('discord.js')

const db = require('quick.db')

module.exports = {
    name: 'beg',
    category: 'Economy',
    description: 'Begs for some money!',
    aliases: [],
    usage: 'beg',
    userperms: [],
    botperms: [],
    run: async (client, message, args) => {
        let user = message.author;

        let timeout = 180000;
        let amount = Math.floor(Math.random() * 500)

        let beg = await db.fetch(`beg_${user.id}`);

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let timeEmbed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`:x: You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
            message.lineReplyNoMention(timeEmbed)

        } else {

            let moneyEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`:white_check_mark: You've begged and received ${amount} coins`);
            message.channel.send(moneyEmbed)
            db.add(`balance_${user.id}`, amount)
            db.set(`beg_${user.id}`, Date.now())


        }
    }
}