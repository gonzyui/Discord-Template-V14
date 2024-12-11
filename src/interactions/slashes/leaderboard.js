const Interaction = require('../../struct/Interaction');
const UserModel = require('../../models/Users');
const { embed } = require('../../utils/Utils');

module.exports = class PingCommand extends Interaction {
    constructor() {
        super({
            name: 'leaderboard',
            description: "Get server's 10 highest levels.",
            type: 1,
        });
    }

    async exec(interaction) {
        const leaderboard = await UserModel.find().sort({ level: -1 }).limit(10);
        if (leaderboard.length === 0) {
            return interaction.reply('No one has XP on this server.')
        }

        let leaderboardText = leaderboard.map((user, index) => `${index + 1}. ${interaction.guild.members.cache.get(user.userID).user.username} - Level ${user.level}`).join('\n');

        const emb = embed(interaction.client)
            .setTitle('Levels leaderboard')
            .setDescription(leaderboardText);
        return interaction.reply({ embeds: [emb] });
    }
};
