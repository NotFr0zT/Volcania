const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setmuterole',
    category: 'Moderation',
    description: 'Creates/sets a muterole',
    aliases: ['setmute', 'muterole'],
    usage: 'setmuterole <role>',
    userperms: ['MANAGE_GUILD'],
    botperms: [],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        if (!args[0]) {
            let b = await db.fetch(`muterole_${message.guild.id}`);
            let roleName = message.guild.roles.cache.get(b);
            if (message.guild.roles.cache.has(b)) {
                return message.channel.send(
                    `**Muterole Set In This Server Is \`${roleName.name}\`!**`
                );
            } else
                return message.channel.send(
                    "**Please Enter A Role Name or ID To Set!**"
                );
        }

        let role =
            message.mentions.roles.first() ||
            client.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
            message.guild.roles.cache.find(
                c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
            );

        if (!role)
            return message.channel.send("**Please Enter A Valid Role Name or ID!**");

        try {
            let a = await db.fetch(`muterole_${message.guild.id}`);

            if (role.id === a) {
                return message.channel.send(
                    "**This Role is Already Set As Muterole!**"
                );
            } else {
                db.set(`muterole_${message.guild.id}`, role.id);

                message.channel.send(
                    `**\`${role.name}\` Has Been Set Successfully As Muterole!**`
                );
            }
        } catch (e) {
            return message.channel.send(
                "**Error - `Missing Permissions or Role Doesn't Exist!`**",
                `\n${e.message}`
            );
        }
    }
}