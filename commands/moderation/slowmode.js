const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    category: 'Moderation',
    description: 'Sets the slowmode of then channel you\'re in',
    aliases: ['sm', 'sw'],
    usage: 'slowmode <time in seconds> [reason]',
    example: 'slowmode 20s Too much spam',
    userperms: [],
    botperms: [],
    run: async (client, message, args) => {
        if (!db.fetch(`moderation_${message.guild.id}`) === true) return message.channel.send(`Moderation is not enabled in **${message.guild.name}**! \`Type v!moderation on\` to turn it on!`)
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You do not have **MANAGE_CHANNELS** permission!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('You did not specify a time!').then(m => m.delete({ timeout: 5000 }));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'No reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('Channel cooldown is already off').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Slowmode Disabled')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason).then(message.channel.send(embed))

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('Not a valid time, please try again!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('That slowmode limit is too high, please enter anything lower than 6 hours.').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Slowmode is already set to ${args[0]}`);

        embed.setTitle('Slowmode Enabled')
            .addField('Slowmode: ', args[0])
            .addField('Reason: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time)
        message.channel.send(embed)

    }
}