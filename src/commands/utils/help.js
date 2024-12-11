const { embed, removeDuplicates, formatPerms } = require('../../utils/Utils');

module.exports = class Help extends Command {
    constructor() {
        super({
            name: "help",
            aliases: ["?", "commands"],
            description: "Help menu",
            usage: "<commande>",
            category: "Utils",
            ownerOnly: false,
            cooldown: 5000,
            memberPerms: ['SEND_MESSAGES'],
            clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS', 'EMBED_MESSAGES'],
        });
    }

    async exec(message, args, data) {
        const client = message.client;
        if (!client.commands || !client.aliases) {
            return message.reply("Oops! Commands has not correctly load. Contact my developer!");
        }

        const cmdName = args[0]?.toLowerCase();
        const cmd = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));

        let emb;
        if (!cmd) {
            emb = embed(message.client)
                .setColor(message.member.displayHexColor)
                .setTitle("Help menu")
                .setThumbnail(message.guild.iconURL({ dynamic: true }));

            const categories = removeDuplicates(client.commands.map(cmd => cmd.category));
            for (const category of categories) {
                const dir = client.commands.filter(cmd => cmd.category === category);
                emb.addFields({
                    name: `__${category}__ [${dir.size}]`,
                    value: `${dir.map(cmd => `\`${cmd.name}\``).join(' ')}`
                });
            }

            return message.channel.send({ embeds: [emb] });
        } else {
            emb = embed(message.client)
                .setTitle(`Help for ${cmd.name}`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription([
                    `**Alias :** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(', ') : 'Aucun'}`,
                    `**Description :** ${cmd.description}`,
                    `**Category :** ${cmd.category}`,
                    `**Permissions :** ${
                        Array.isArray(cmd.memberPerms.toArray?.()) && cmd.memberPerms.toArray().length > 0
                            ? cmd.memberPerms.toArray().map(perm => `\`${formatPerms(perm)}\``).join(', ')
                            : 'No needed permissions.'
                    }`,
                    `**Cooldown :** ${cmd.cooldown / 1000} seconds`,
                    `**Usage :** \`${`${data.guild?.prefix}${cmd.name} ${cmd.usage || ''}`.trim()}\``,
                ].join('\n'));
            return message.channel.send({ embeds: [emb] });

        }
    }
};
