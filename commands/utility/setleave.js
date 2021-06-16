const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setleave',
    category: 'Welcome',
    description: 'Sets the leave channel for your guild',
    aliases: ['setleavechannel', 'leavechannel'],
    usage: 'setleave <channel>',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first()

        if (args[0] === 'off') {
            db.delete(`leavechannel_${message.guild.id}`)
            message.channel.send('Set it to off!')
        }

        if (!channel) {
            return message.channel.send("Please Mention the channel first")
        }

        db.set(`leavechannel_${message.guild.id}`, channel.id)

        message.channel.send(`Set leave channel to ${channel}`)
        channel.send(new MessageEmbed()
            .setTitle('Leave channel set!')
            .setFooter('This will be deleted in 60 seconds.')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription('This channel has been set to the leave channel for **' + message.guild.name + '**') //didnt bother to do the other ''
            .setColor('GREEN')
        ).then((msg) => {
            setTimeout(() => msg.delete(), 60000)
        })
    }
}