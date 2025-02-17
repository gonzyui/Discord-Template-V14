const { SlashCommandBuilder } = require("discord.js");

module.exports = class Language {
    constructor() {
        this.name = "language";
        this.data = new SlashCommandBuilder()
            .setName("language")
            .setDescription("Allows you to change my language.")
            .addStringOption(option =>
                option
                    .setName("language")
                    .setDescription("Language code (e.g, en, fr)")
                    .setRequired(true)
                    .addChoices(
                        { name: 'Français', value: 'fr' },
                        { name: 'English', value: 'en' },
                    )
            );
    }

    async execute(client, interaction, _data) {
        const newLang = interaction.options.getString("language").toLowerCase();
        await client.database.updateGuild(interaction.guildId, { "settings.language": newLang });
        const replyMessage = client.languageManager.getTranslation(newLang, "language_updated", { language: newLang });
        await interaction.reply({
            content: replyMessage,
            flags: ["Ephemeral"],
        });
    }
}
