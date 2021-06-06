const { MessageEmbed, Client, Message, MessageAttachment } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('quick.db');
// const Canvas = require('canvas')

module.exports = {
    name: 'spank',
    category: 'Fun',
    description: 'Spank\'s a user',
    aliases: [],
    usage: 'spank <user>',
    example: 'spank @Fr0zT',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        // let spanks = [`https://i.imgur.com/tXBdEWD.png`];
        // let spankR = spanks[Math.floor(Math.random() * spanks.length)];
        // const personspank1 = client.user || message.author;
        // const personspank2 = message.mentions.users.first() || message.author;

        // const canvas1 = Canvas.createCanvas(1024, 1024);
        // const canvas2 = Canvas.createCanvas(1024, 1024);
        // const ctx1 = canvas1.getContext('2d');
        // const ctx2 = canvas2.getContext('2d');

        // const background1 = await Canvas.loadImage(spankR);
        // ctx1.drawImage(background1, 0, 0, canvas1.width, canvas1.height);

        // const background2 = await Canvas.loadImage(spankR);
        // ctx2.drawImage(background2, 0, 0, canvas2.width, canvas2.height);

        // const avatar1 = await Canvas.loadImage(personspank1.displayAvatarURL({ format: 'png' }));
        // const avatar2 = await Canvas.loadImage(personspank2.displayAvatarURL({ format: 'png' }));
        // const avatar11 = await Canvas.loadImage(`https://cdn.discordapp.com/avatars/843428824385716244/5f58728f5a7f1e9f6190e5ecc7b6c3b7.png`);
        // const avatar22 = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
        // // Move the image downwards vertically and constrain its height to 220, so it's a square
        // ctx1.drawImage(avatar11, 460, 300, 220, 220);
        // ctx1.drawImage(avatar22, 710, 530, 220, 220);
        // ctx2.drawImage(avatar1, 460, 300, 220, 220);
        // ctx2.drawImage(avatar2, 710, 530, 220, 220);

        // const attachment1 = new MessageAttachment(canvas1.toBuffer(), spankR);
        // const attachment2 = new MessageAttachment(canvas2.toBuffer(), spankR);
        // const embed = new MessageEmbed()
        //     .setDescription("I don't know who im gonna spank. 🤔")
        //     .setColor('BLUE')

        // const notvalid = new MessageEmbed()
        //     .setDescription("That doesn't seem to be a valid user. 🤔")
        //     .setColor('BLUE')

        // if (!args.length) {
        //     return message.channel.send(embed);
        // }

        // else if (args[0] === `${personspank1}`) {
        //     return message.channel.send(attachment2);
        // }

        // else if (args[0] === `me`) {
        //     return message.channel.send(attachment1);
        // }

        // else if (!message.mentions.users.size) {
        //     return message.channel.send(notvalid);
        // }

        // message.channel.send(attachment2);
        message.channel.send('Disabled for now')
    }
}