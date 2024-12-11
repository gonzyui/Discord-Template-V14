const Util = require('../../utils/Utils');

module.exports = class Ping extends Command {
    constructor() {
        super({
            name: "serverinfo",
            aliases: ["si"],
            description: "Send information about the server",
            category: "Utils",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: ['SEND_MESSAGES'],
            clientPerms: ['EMBED_LINKS', 'EMBED_MESSAGES'],
        });
    }

    async exec(message) {
        try {
            const members = await message.guild.members.fetch();
            const humans = members.filter(member => !member.user.bot);
            const bots = members.filter(member => member.user.bot);
            const owner = await message.guild.fetchOwner();

            const emb = Util.embed(message.client)
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                .setThumbnail(message.guild.iconURL())
                .setTitle(`Informations about ${message.guild.name}`)
                .setDescription(`**Description**\n${message.guild.description || 'No description provided'}`)
                .addFields(
                    {
                        name: 'Members',
                        value: `${humans.size} humans (${bots.size} bots)`,
                    },
                    {
                        name: 'Channels',
                        value: `${message.guild.channels.cache.size} channels`,
                    },
                    {
                        name: 'Server boosts',
                        value: `${message.guild.premiumSubscriptionCount || 0} boosts`,
                    },
                    {
                        name: 'Created',
                        value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:F>`, // Format timestamp
                    },
                    {
                        name: 'Owner',
                        value: `<@${owner.id}> (${owner.user.username})`,
                    },
                    {
                        name: 'ID',
                        value: `${message.guild.id}`,
                    }
                );

            return message.channel.send({ embeds: [emb] });
        } catch (error) {
            message.client.logger.error('An error occurred when trying to do serverinfo command!' + error.message,);
            await message.channel.sendTyping();
            return message.reply("An error occurred when trying to get server's informations !")
        }
    }
};
