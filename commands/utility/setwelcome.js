const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setwelcome',
    category: 'Welcome',
    description: 'Sets the welcome channel for your guild',
    aliases: ['setwelcomechannel', 'welchannel'],
    usage: 'setwelcome <channel>',
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
            db.delete(`welchannel_${message.guild.id}`)
        }

        if (!channel) {
            return message.channel.send("Please Mention the channel first")
        }

        db.set(`welchannel_${message.guild.id}`, channel.id)

        message.channel.send(`Set welcome channel to ${channel}`)
        channel.send(new MessageEmbed()
            .setTitle('Welcome channel set!')
            .setFooter('This will be deleted in 60 seconds.')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription('This channel has been set as the welcome channel for **' + message.guild.name + '**') //didnt bother to do the other ''
            .setColor('GREEN')
        ).then((msg) => {
            setTimeout(() => msg.delete(), 60000)
        })
    }
}