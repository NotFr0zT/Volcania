console.log("Loading Setups")
const { MessageEmbed, Client, Message, GuildMember } = require('discord.js')
const { validatePermissions } = require('../functions');
const { PREFIX, OWNER } = process.env;
const db = require('quick.db')

/**
 * 
 * @param {Client} client 
 * @param {Message} client
 * @param {GuildMember} member
 */

module.exports = async (client) => {

    //     ____ _   _ ___ _     ____   ____ ____  _____    _  _____ _____   _______     _______ _   _ _____ 
    //     / ___| | | |_ _| |   |  _ \ / ___|  _ \| ____|  / \|_   _| ____| | ____\ \   / / ____| \ | |_   _|
    //    | |  _| | | || || |   | | | | |   | |_) |  _|   / _ \ | | |  _|   |  _|  \ \ / /|  _| |  \| | | |  
    //    | |_| | |_| || || |___| |_| | |___|  _ <| |___ / ___ \| | | |___  | |___  \ V / | |___| |\  | | |  
    //     \____|\___/|___|_____|____/ \____|_| \_\_____/_/   \_\_| |_____| |_____|  \_/  |_____|_| \_| |_|  

    client.on('guildCreate', async (guild) => {
        let defaultChannel = 'general';
        guild.channels.cache.forEach((channel) => {
            if (channel.type == 'text' && defaultChannel == 'general') {
                if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
                    defaultChannel = channel;
                }
            }
        })

        db.set(`moderation_${guild.id}`, true)

        defaultChannel.send(new MessageEmbed()
            .setTitle('Thank you for adding me!')
            .setDescription('Hello there! Thanks for inviting me to your server! Need help? Type `v!help`')
            .addField('Important Links:', `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=843428824385716244&permissions=8&scope=bot)\n[Support Server](https://discord.gg/xyqpAvyPgZ)\n [Github Repository](https://github.com/NotFr0zT/Volcania)`)
            .setColor('BLUE')
            .setFooter(`Note: Moderation is enabled by default | Turn it off by v!moderation off`)
            .setTimestamp()
        )
    })

    // ____  _____    _    ______   __  _______     _______ _   _ _____ 
    // |  _ \| ____|  / \  |  _ \ \ / / | ____\ \   / / ____| \ | |_   _|
    // | |_) |  _|   / _ \ | | | \ V /  |  _|  \ \ / /|  _| |  \| | | |  
    // |  _ <| |___ / ___ \| |_| || |   | |___  \ V / | |___| |\  | | |  
    // |_| \_\_____/_/   \_\____/ |_|   |_____|  \_/  |_____|_| \_| |_|  

    client.on('ready', async () => {

        let totalMembers = 0;

        for (const guild of client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size;
        }

        const botStatus = [
            `in ${client.guilds.cache.size} servers`,
        ];

        setInterval(function () {
            const status = botStatus[Math.floor(Math.random() * botStatus.length)];
            client.user.setPresence({ activity: { type: 'PLAYING', url: "https://www.twitch.tv/fr0zttt", name: status } });
        }, 30000);

        console.log(`Logged in as ${client.user.tag}`);
        console.log('Prefix:', PREFIX);
    })

    // __  __ _____ ____ ____    _    ____ _____   _______     _______ _   _ _____ 
    // |  \/  | ____/ ___/ ___|  / \  / ___| ____| | ____\ \   / / ____| \ | |_   _|
    // | |\/| |  _| \___ \___ \ / _ \| |  _|  _|   |  _|  \ \ / /|  _| |  \| | | |  
    // | |  | | |___ ___) |__) / ___ \ |_| | |___  | |___  \ V / | |___| |\  | | |  
    // |_|  |_|_____|____/____/_/   \_\____|_____| |_____|  \_/  |_____|_| \_| |_|  

    client.on('message', async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return message.channel.send(`Bruh, please use me in a guild ;-;`);

        const prefix = PREFIX;
        let totalMembers = 0;

        for (const guild of client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size;
        }

        if (message.content === 'v!users') return message.channel.send(totalMembers)
        if (message.content === 'v!servers') return message.channel.send(client.guilds.cache.size)
        if (message.content === 'v!commands') return message.channel.send(client.commands.size)
        if (message.content === 'hi volcania' && message.guild.id === '712643946748182608') return message.channel.send('hello')
        if (message.content === 'hru volcania' && message.guild.id === '712643946748182608') return message.channel.send('im :sparkles: **bad** :sparkles: how are you tho?')
        if (message.content === 'thats good to hear volcania' && message.guild.id === '712643946748182608') return message.channel.send('am I right!?')

        if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
            message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
        }

        if (!message.content.startsWith(prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

        if (command) {
            if (command.userperms.length > 0 || command.botperms.length > 0) {
                if (typeof command.userperms === 'string') {
                    command.userperms = command.userperms.split();
                    validatePermissions(command.userperms);
                }

                for (const permission of command.userperms) {
                    if (permission === 'OWNER' && message.member.id !== OWNER) {
                        return;
                    }
                    else if (!message.member.hasPermission(permission)) {
                        return message.channel.send(new MessageEmbed()
                            .setTitle("Permission Error")
                            .setDescription("Sorry, you don't have permissions to use this! ❌")
                            .setFooter(`Use v!help ${cmd} to see the required permissions!`)
                        );
                    }
                }

                if (typeof command.botperms === 'string') {
                    command.botperms = command.botperms.split();
                    validatePermissions(command.botperms);
                }

                for (const permission of command.botperms) {
                    if (!message.guild.me.hasPermission(permission)) {
                        return message.channel.send(new MessageEmbed()
                            .setTitle("Permission Error")
                            .setDescription("I don't have permissions to use this! ❌")
                            .setFooter(`${permission} required!`)
                        );
                    }
                }
            }
            command.run(client, message, args, prefix);
        }
    })

    //     ____ _   _ ___ _     ____  __  __ _____ __  __ ____  _____ ____      _    ____  ____    _______     _______ _   _ _____ 
    //     / ___| | | |_ _| |   |  _ \|  \/  | ____|  \/  | __ )| ____|  _ \    / \  |  _ \|  _ \  | ____\ \   / / ____| \ | |_   _|
    //    | |  _| | | || || |   | | | | |\/| |  _| | |\/| |  _ \|  _| | |_) |  / _ \ | | | | | | | |  _|  \ \ / /|  _| |  \| | | |  
    //    | |_| | |_| || || |___| |_| | |  | | |___| |  | | |_) | |___|  _ <  / ___ \| |_| | |_| | | |___  \ V / | |___| |\  | | |  
    //     \____|\___/|___|_____|____/|_|  |_|_____|_|  |_|____/|_____|_| \_\/_/   \_\____/|____/  |_____|  \_/  |_____|_| \_| |_|  

    client.on('guildMemberAdd', async (member) => {
        let chx = db.get(`welchannel_${member.guild.id}`);

        if (chx === null || undefined) return;

        let wembed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setColor("GREEN")
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`We are very happy to have you in **${member.guild.name}**`)
            .setThumbnail(member.guild.iconURL({ dynamic: true }))
            .setFooter(`You are the #${member.guild.memberCount} member!`)
            .setTitle('Join')

        client.channels.cache.get(chx).send(`<@${member.id}>`, wembed)
    })

    //     ____ _   _ ___ _     ____  __  __ _____ __  __ ____  _____ ____  ____  _____ __  __  _____     _______   _______     _______ _   _ _____ 
    //     / ___| | | |_ _| |   |  _ \|  \/  | ____|  \/  | __ )| ____|  _ \|  _ \| ____|  \/  |/ _ \ \   / / ____| | ____\ \   / / ____| \ | |_   _|
    //    | |  _| | | || || |   | | | | |\/| |  _| | |\/| |  _ \|  _| | |_) | |_) |  _| | |\/| | | | \ \ / /|  _|   |  _|  \ \ / /|  _| |  \| | | |  
    //    | |_| | |_| || || |___| |_| | |  | | |___| |  | | |_) | |___|  _ <|  _ <| |___| |  | | |_| |\ V / | |___  | |___  \ V / | |___| |\  | | |  
    //     \____|\___/|___|_____|____/|_|  |_|_____|_|  |_|____/|_____|_| \_\_| \_\_____|_|  |_|\___/  \_/  |_____| |_____|  \_/  |_____|_| \_| |_|  

    client.on('guildMemberRemove', async (member) => {
        let chx = db.get(`leavechannel_${member.guild.id}`);

        if (chx === null || undefined) return;

        let wembed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setColor("RED")
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`Sad to see you go **${member.user.tag}**...`)
            .setThumbnail(member.guild.iconURL({ dynamic: true }))
            .setFooter(`There is now #${member.guild.memberCount} members left!`)
            .setTitle('Leave')

        client.channels.cache.get(chx).send(`<@${member.id}>`, wembed)
    })

}
console.log('Loaded all events...')