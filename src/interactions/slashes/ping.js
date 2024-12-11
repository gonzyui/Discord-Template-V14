const Interaction = require('../../struct/Interaction');
const { embed } = require('../../utils/Utils');

module.exports = class PingCommand extends Interaction {
    constructor() {
        super({
            name: 'ping',
            description: "Get bot's latency",
            type: 1,
        });
    }

    async exec(interaction) {
        const emb = embed(interaction.client)
            .setDescription(`Database: ${Math.round(await interaction.client.databasePing())}ms\nBot: ${Math.round(interaction.createdTimestamp - Date.now())}ms`)
        await interaction.reply({ embeds: [emb], ephemeral: true });
    }
};
