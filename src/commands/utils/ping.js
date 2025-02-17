const { SlashCommandBuilder } = require("discord.js");

module.exports = class Ping {
    constructor() {
        this.name = "ping";
        this.data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with my ping.");
    }
    async execute(client, interaction, data) {
        const lang = data.settings.language || client.languageManager.defaultLang;
        const replyText = client.languageManager.getTranslation(lang, "ping", { ping: client.ws.ping });
        await interaction.reply({
            content: replyText,
            flags: ["Ephemeral"],
        });
    }
}
