const Interaction = require('../../struct/Interaction');
const { embed } = require('../../utils/Utils');

module.exports = class UserInfo extends Interaction {
    constructor() {
        super({
            name: "User Info",
            type: 2,
            description: "Display information about a user",
        });
    }

    async exec(interaction) {
        const user = interaction.targetMember.user;
        const member = interaction.targetMember;

        const roles = member.roles.cache.map(role => role.name).join(', ');
        const permissions = member.permissions.toArray();
        const maxDisplayPermissions = 10;
        const displayPermissions = permissions.length > 0
            ? permissions.slice(0, maxDisplayPermissions).join(', ')
            : 'No permissions';

        const remainingPermissions = permissions.length > maxDisplayPermissions ? `... (${permissions.length - maxDisplayPermissions} more)` : '';
        const joinedAt = member.joinedAt.toDateString();
        const nickname = member.nickname || 'No nickname';

        const emb = embed(interaction.client)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`Informations about ${user.username}`)
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'Nickname', value: nickname, inline: true },
                { name: 'User ID', value: user.id },
                { name: 'Joined Discord On', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'Joined Server On', value: joinedAt, inline: true },
                { name: `Roles[${member.roles.cache.size - 1}]`, value: roles || 'No roles', inline: false },
                { name: 'Permissions', value: `${displayPermissions}**${remainingPermissions}**`, inline: true },
            );

        return interaction.reply({ embeds: [emb] });
    }
};
