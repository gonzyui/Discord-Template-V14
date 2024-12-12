const Interaction = require('../../struct/Interaction');
const { embed, button, rowBuilder } = require('../../utils/Utils');
const {ButtonStyle} = require("discord-api-types/v10");

module.exports = class AvatarCommand extends Interaction {
    constructor() {
        super({
            name: 'Avatar',
            type: 2,
        });
    }

    async exec(interaction) {
        const user = interaction.targetUser;
        await interaction.reply({
            content: `${user.username}'s avatar`,
            embeds: [embed(interaction.client).setImage(user.displayAvatarURL({ size: 1024 })).setColor('Orange')],
            components: [rowBuilder().addComponents(button().setStyle(ButtonStyle.Link).setURL(user.avatarURL()).setLabel('Go to link'))],
            ephemeral: true,
        });
    }
};
