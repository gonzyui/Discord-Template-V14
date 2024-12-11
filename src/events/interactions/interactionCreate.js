const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (!interaction.isCommand() && !interaction.isContextMenuCommand()) return;
        const command = client.interactions.get(interaction.commandName);
        if (!command) {
            return interaction.reply({ content: "This interaction does not exists!", ephemeral: true });
        }
        try {
            await command.exec(interaction);
        } catch (error) {
            client.logger.error(`An error occurred when trying to execute ${interaction.commandName}.\n${error}`);
            await interaction.reply({ content: "I got an error when trying to execute this interaction. Please contact my developer.", ephemeral: true });
        }
    }
}