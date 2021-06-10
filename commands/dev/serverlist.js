const Discord = require("discord.js");
const OWNER_ID = "765767707621589032"; //fr0zt

module.exports = {
    name: 'serverlist',
    aliases: [],
    category: 'Dev',
    description: 'Get\'s a list of servers',
    usage: 'serverlist',
    userperms: ['OWNER'],
    botperms: [],
    run: async (client, message, args, prefix) => {
        try {
            if (message.author.id != OWNER_ID) return message.channel.send(`<a:_cross:725303285015117844> Developer Only <a:_cross:725303285015117844>`);
            let data = [];
            client.guilds.cache.forEach(x => {
                message.channel.send(`🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`);
            });

            if (data.length > 0) {
                data.sort();
                data = `🔹 ` + data.join('\n🔹');
            }
            else {
                data = "[No server found]";
            }
        } catch (err) {
            console.log(err)
        }
    }
}