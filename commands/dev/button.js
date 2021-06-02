const { MessageButton } = require('discord-buttons');
const ownerid = "765767707621589032"; //fr0zt
const ownerid2 = ["other owner.."];

module.exports = {
    name: 'button',
    aliases: [],
    category: 'Dev',
    description: 'Sends a button',
    usage: 'button',
    userperms: ['ADMINISTRATOR'],
    botperms: [],
    run: async (client, message, args, prefix) => {
        if (message.author.id === ownerid) {

            const button1 = new MessageButton()
                .setStyle('green')
                .setLabel('Send "i like green"')
                .setID('button1')

            const button2 = new MessageButton()
                .setStyle('red')
                .setLabel('Send "i like red"')
                .setID('button2')

            message.channel.send('Click this button to get a response', {
                buttons: [button1, button2]
            })

        } else {

            message.lineReplyNoMention('Bruh, you arent the owner')

        }
    }
}