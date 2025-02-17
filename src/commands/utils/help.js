const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = class Help {
    constructor() {
        this.name = 'help';
        this.data = new SlashCommandBuilder()
            .setName('help')
            .setDescription('Displays all available commands.');
    }

    async execute(client, interaction, data) {
        const lang = data.settings.language || client.languageManager.defaultLang;
        const commands = client.commands.map(cmd => {
            const description = cmd.data.description || client.languageManager.getTranslation(lang, 'no_description');
            return `**/${cmd.data.name}** - ${description}`;
        });

        const embed = new EmbedBuilder()
            .setTitle(client.languageManager.getTranslation(lang, 'help_title'))
            .setDescription(commands.join('\n'))
            .setColor(0x00AE86);

        await interaction.reply({ embeds: [embed], flags: ["Ephemeral"] });
    }
};
