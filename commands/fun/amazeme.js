const { MessageEmbed, Client, Message } = require('discord.js');
const got = require('got')

module.exports = {
    name: 'amazeme',
    category: 'Fun',
    description: 'Amazed',
    aliases: [],
    usage: 'amazeme',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        got('https://www.reddit.com/r/interestingasfuck/random.json').then(response => {
            let content = JSON.parse(response.body);
            var title = content[0].data.children[0].data.title;
            var amazeme = content[0].data.children[0].data.url;
            let jokeembed = new MessageEmbed()
                .setDescription(`[\`Click here\`](${amazeme})`)
                .setColor('GREEN').setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                .setTitle(title)
                .setTimestamp()
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }));
            if (amazeme.toLowerCase().endsWith("png") || amazeme.toLowerCase().endsWith("jpg") || amazeme.toLowerCase().endsWith("jpeg") || amazeme.toLowerCase().endsWith("gif")) jokeembed.setImage(amazeme);
            return message.channel.send(jokeembed);
        }).catch(console.error);
    }
}