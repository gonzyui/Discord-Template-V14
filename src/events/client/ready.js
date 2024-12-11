const { ActivityType } = require("discord-api-types/v10");
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        /* Log that our bot is successfully connected into discord */
        client.logger.log(`Connected successfully to Discord API with ${client.user.username}.`);
        /*
        When connecting bot will be on streaming
        Change to ActivityType.Playing | Watching or something else I let you go to DJS doc
        */
        client.user.setActivity(
            `WIP | github.com/gonzyui`,
            {
                type: ActivityType.Streaming,
                url: 'https://www.youtube.com/watch?v=4TnAKurylA8'
            });
        //await client.loadInteractions();
    },
};