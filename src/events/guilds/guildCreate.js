module.exports = class GuildCreate {
    constructor() {
        this.name = "guildCreate";
        this.event = "guildCreate";
    }

    async execute(client, guild) {
        try {
            await client.database.getGuild(guild.id);
            console.log(`✅ Guild ${guild.id} added to database.`);
        } catch (error) {
            console.error(`🚨 Error creating guild ${guild.id}: ${error}`);
        }
    }
}
