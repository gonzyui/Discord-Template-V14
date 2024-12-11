const Interaction = require('../../struct/Interaction');
const { embed } = require('../../utils/Utils');
const UserModel = require('../../models/Users');

module.exports = class UserInfo extends Interaction {
    constructor() {
        super({
            name: "Level",
            type: 2,
            description: "Display level from user selected.",
        });
    }

    async exec(interaction) {
        let userData = await UserModel.findOne({ userID: interaction.user.id });
        if (!userData) {
            return interaction.reply({ content: `There's no user found with id ${interaction.user.id}`, ephemeral: true });
        }
        const emb = embed(interaction.client)
            .setTitle(`${interaction.user.username} level information`)
            .setDescription(`Level: ${userData.level}\nXP: ${userData.xp}`)
        return interaction.reply({ embeds: [emb] });
    }
};
