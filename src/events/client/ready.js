const { ActivityType } = require('discord.js');

module.exports = class Ready {
    constructor() {
        this.name = 'ready';
        this.event = 'ready';
    }
    async execute(client) {
        await client.loadCommands();
        client.user.setActivity({
            name: '/help',
            type: ActivityType.Custom,
        });
        console.log(`${client.user.tag} has started`);
    }
}