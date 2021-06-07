const { MessageEmbed, Client, Message } = require('discord.js');
const figlet = require('figlet');

module.exports = {
    name: 'ascii',
    category: 'Fun',
    description: 'Ascii art!',
    aliases: [],
    usage: 'ascii text',
    example: 'ascii I\'m just better',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        let blacklisted = [
            "abbo",
            "abo",
            "beeyotch",
            "biatch",
            "bitch",
            "chinaman",
            "chinamen",
            "chink",
            "coolie",
            "coon",
            "crazie",
            "crazy",
            "crip",
            "cuck",
            "cunt",
            "dago",
            "daygo",
            "dego",
            "dick",
            "douchebag",
            "dumb",
            "dyke",
            "eskimo",
            "fag",
            "faggot",
            "fatass",
            "fatso",
            "gash",
            "gimp",
            "golliwog",
            "gook",
            "goy",
            "goyim",
            "gyp",
            "gypsy",
            "half-breed",
            "halfbreed",
            "heeb",
            "homo",
            "hooker",
            "idiot",
            "insane",
            "insanitie",
            "insanity",
            "jap",
            "kaffer",
            "kaffir",
            "kaffir",
            "kaffre",
            "kafir",
            "kike",
            "kraut",
            "lame",
            "lardass",
            "lesbo",
            "lunatic",
            "mick",
            "negress",
            "negro",
            "nig",
            "nig-nog",
            "nigga",
            "nigger",
            "nigguh",
            "nip",
            "pajeet",
            "paki",
            "pickaninnie",
            "pickaninny",
            "prostitute",
            "pussie",
            "pussy",
            "raghead",
            "retard",
            "sambo",
            "shemale",
            "skank",
            "slut",
            "soyboy",
            "spade",
            "sperg",
            "spic",
            "spook",
            "squaw",
            "street-shitter",
            "tard",
            "tits",
            "titt",
            "trannie",
            "tranny",
            "twat",
            "wetback",
            "whore",
            "wigger",
            "wop",
            "yid",
            "zog"
        ];
        let foundInText = false;
        for (var i in blacklisted) {
            if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
        if (foundInText) {
            message.delete();
            message.channel.send('Can\'t use slur words!');
        } else {
            if (!args.slice(0).join(' ')) return message.channel.send('Please provide some text');
            msg = args.slice(0).join(' ');
            figlet.text(msg, function (err, data) {
                if (err) {
                    console.log('Something went wrong');
                    console.dir(err);
                }
                if (data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

                message.channel.send('```' + data + '```')
            })
        };
    }
}