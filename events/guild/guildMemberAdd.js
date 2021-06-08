const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = async (member, guild) => {
    let chx = db.get(`welchannel_${guild.id}`);
    let role = db.get(`welrole_${guild.id}`);

    if (chx === null || role === null) {
        return;
    }


    let wembed = new MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL())
        .setColor("#ff2050")
        .setThumbnail(member.user.avatarURL())
        .setDescription(`We are very happy to have you in our server`);

    client.channels.cache.get(chx).send(wembed)
}