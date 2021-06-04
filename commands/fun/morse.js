const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('quick.db')

module.exports = {
    name: 'morse',
    category: 'Fun',
    description: 'Sends some morse code back',
    aliases: [],
    usage: 'morse',
    example: 'morse Hello there!',
    userperms: [],
    botperms: [],
    run: async (client, message, args) => {
        // let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
        //     morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
        //     text = args.join(" ").toLowerCase();
        // if (!text) return message.channel.send('Place a text or a morse code to be encoded or decoded.') // but you can change the answer :)

        // while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
        //     text = text.replace("Ä", "AE").replace("Ö", "OE").replace("Ü", "UE");
        // }
        // if (text.startsWith(".") || text.startsWith("-")) {
        //     text = text.split(" ");
        //     let length = text.length;
        //     for (i = 0; i < length; i++) {
        //         text[i] = alpha[morse.indexOf(text[i])];
        //     }
        //     text = text.join("");
        // } else {
        //     text = text.split("");
        //     let length = text.length;
        //     for (i = 0; i < length; i++) {
        //         text[i] = morse[alpha.indexOf(text[i])];
        //     }
        //     text = text.join(" ");
        // }
        // return message.channel.send("```" + text + "```");
        message.channel.send(
            'Temporarily disabled do to a bug.'
        )
    }
}