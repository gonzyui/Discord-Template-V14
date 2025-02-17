module.exports = class GuildDelete {
    constructor() {
        this.name = "guildDelete";
        this.event = "guildDelete";
    }

    async execute(client, guild) {
        try {
            await client.database.deleteGuild(guild.id);
            console.log(`✅ Guild ${guild.id} removed from database.`);
        } catch (error) {
            console.error(`🚨 Error deleting guild ${guild.id}: ${error}`);
        }
    }
}
