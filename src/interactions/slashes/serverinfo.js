const Interaction = require('../../struct/Interaction');
const { embed } = require('../../utils/Utils');

module.exports = class ServerInfoCommand extends Interaction {
    constructor() {
        super({
            name: 'serverinfo',
            description: "Get server's informations.",
            type: 1,
        });
    }

    async exec(interaction) {
        try {
            const members = await interaction.guild.members.fetch();
            const humans = members.filter(member => !member.user.bot);
            const bots = members.filter(member => member.user.bot);
            const owner = await interaction.guild.fetchOwner();

            const emb = embed(interaction.client)
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setThumbnail(interaction.guild.iconURL())
                .setTitle(`Informations about ${interaction.guild.name}`)
                .setDescription(`**Description**\n${interaction.guild.description || 'No description provided'}`)
                .addFields(
                    {
                        name: 'Members',
                        value: `${humans.size} humans (${bots.size} bots)`,
                    },
                    {
                        name: 'Channels',
                        value: `${interaction.guild.channels.cache.size} channels`,
                    },
                    {
                        name: 'Server boosts',
                        value: `${interaction.guild.premiumSubscriptionCount || 0} boosts`,
                    },
                    {
                        name: 'Created',
                        value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:F>`, // Format timestamp
                    },
                    {
                        name: 'Owner',
                        value: `<@${owner.id}> (${owner.user.username})`,
                    },
                    {
                        name: 'ID',
                        value: `${interaction.guild.id}`,
                    }
                );

            return interaction.reply({ embeds: [emb] });
        } catch (error) {
            interaction.client.logger.error('An error occurred when trying to do serverinfo command!' + error.message,);
            await interaction.deferReply({ ephemeral: true });
            return interaction.reply("An error occurred when trying to get server's informations !")
        }
    }
};
