const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'policy',
    category: 'Utility',
    description: 'Shows the privacy policy for the bot!',
    aliases: ['security'],
    usage: 'policy',
    userperms: [],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const icon = message.guild.iconURL({ dynamic: true })
        const embed = new MessageEmbed()
            .setTitle("VOLCANIA BOT PRIVACY POLICY")
            .setThumbnail(icon)
            .setDescription("By using the bot you agree to our privacy policy")
            .addField("**WHAT DATA DO WE STORE?**", `
    We do not collect any personal information relating your account like Passwords or any other Credentials. The data we collect includes the User IDs, Server IDs, Channel IDs and Some Role IDs. The bot never requests for any personal data of the users and any act that breaks the Tos of Discord is discouraged by us!`)
            .addField("**WHY WE NEED THIS DATA?**", `
    The data is required for the proper functioning of the bot features like Warning System, Logging and Autoroles. Without this data, our bot will not be able to perform these activities and thus making the features inaccessible for users`)
            .addField("**HOW DO WE USE THIS DATA?**", `
    The data is used for the proper functioning for theWarning System, Logging activities and Autorole features of our Bot. User IDs are used to identify the users, Channel IDs are used to send the messages to the desginated channels and Server IDs to identify the Servers and the Role IDs are used for the Autorole feature`)
            .addField(`**HOW LONG DO WE STORE YOUR DATA?**`, `
    The data is stored as long as the bot is in your Server and as soon as the bot is kicked or removed from the Server, the data is deleted and is no longer to accessable to anyone`)
            .addField("**GOT CONCERNS OR QUERIES?**", `
    If you have any concerns or queries relating our privacy policy or our bot or if you want your data to be removed, You can contact [Fr0zT](https://discord.com/users/765767707621589032) directy on our [Support Server](https://discord.gg/zRQGD58MfE)!`)
            .setThumbnail(client.user.avatarURL())
            .setFooter(`Requested by: ${message.author.username}`)
            .setColor("GREEN")

        return message.channel.send(embed)
    }
}