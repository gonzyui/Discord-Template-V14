module.exports = class InteractionCreate {
    constructor() {
        this.name = "interactionCreate";
        this.event = "interactionCreate";
    }

    async execute(client, interaction) {
        if (!interaction.inGuild()) return;
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        // Retrieve the guild data (which contains the language setting)
        const data = await client.database.getGuild(interaction.guildId);

        try {
            await command.execute(client, interaction, data);
        } catch (error) {
            console.error(`Error while executing ${interaction.commandName}: ${error}`);

            const lang = (data.settings && data.settings.language) || client.languageManager.defaultLang;
            const errorMessage = client.languageManager.getTranslation(lang, "command_error", { command: interaction.commandName });

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: errorMessage,
                    flags: ["Ephemeral"],
                });
            } else {
                await interaction.reply({
                    content: errorMessage,
                    flags: ["Ephemeral"],
                });
            }
        }
    }
}
