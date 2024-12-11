const { embed  } = require('../../utils/Utils');

module.exports = class Ping extends Command {
    constructor() {
        super({
            name: "ping",
            aliases: ["pong", "latency"],
            description: "Send bot's latencies",
            category: "Utils",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: ['SEND_MESSAGES'],
            clientPerms: ['EMBED_LINKS', 'EMBED_MESSAGES'],
        });
    }

    async exec(message) {
        const emb = embed()
            .setColor('2f3136')
            .setDescription(`Database: ${Math.round(await message.client.databasePing())}ms\nBot: ${Math.round(message.createdTimestamp - Date.now())}ms`);
        return message.channel.send({ embeds: [emb] });
    }
}
