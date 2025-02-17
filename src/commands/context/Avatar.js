const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = class Avatar {
    constructor() {
        this.name = "Avatar";
        this.data = new ContextMenuCommandBuilder()
            .setName("Avatar")
            .setType(ApplicationCommandType.User);
    }
    async execute(client, interaction, data) {
        const user = interaction.targetUser || interaction.user;
        const lang = data && data.settings && data.settings.language
            ? data.settings.language
            : client.languageManager.defaultLang;
        const replyMessage = client.languageManager.getTranslation(lang, "avatar", {
            username: user.username,
            avatar: user.displayAvatarURL({ dynamic: true, size: 512 })
        });
        await interaction.reply({
            content: replyMessage,
            flags: ["Ephemeral"],
        });
    }
}
