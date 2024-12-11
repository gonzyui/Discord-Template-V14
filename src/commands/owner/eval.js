<<<<<<< HEAD
const { embed } = require('../../utils/Utils');
const { inspect } = require('util');

module.exports = class Eval extends Command {
    constructor() {
        super({
            name: "eval",
            aliases: ["e"],
            description: "Evaluate some codes",
            usage: "<code>",
            category: "Developer",
            ownerOnly: true,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: ["SEND_MESSAGES", "EMBED_LINKS", "EMBED_MESSAGES"],
        });
    }
    async exec(message, args) {
        const evaled = args.join(' ');
        try {
            if (evaled) {
                const evaluated = await eval(evaled, { depth: 0 });

                await message.channel.sendTyping();
                const msg = await message.reply("> Evaluating..");
                const emb = embed(message.client)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setColor('2f3136')
                    .addFields({
                        name: 'Input:\n```js\n' + `${evaled.substring(0, 1010)}` + '```',
                        value: 'Output:\n```js\n' + `${inspect(evaluated, { depth: 0}).substring(0, 1010)}` + '```'
                    })
                return msg.edit({ content: null, embeds: [emb] });
            } else {
                return message.reply("You need to specify some code!");
            }
        } catch (err) {
            return message.reply(`An error occurred: ${err.message}`);
        }
    }
=======
const { embed } = require('../../utils/Utils');
const { inspect } = require('util');

module.exports = class Eval extends Command {
    constructor() {
        super({
            name: "eval",
            aliases: ["e"],
            description: "Evaluate some codes",
            usage: "<code>",
            category: "Developer",
            ownerOnly: true,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: ["SEND_MESSAGES", "EMBED_LINKS", "EMBED_MESSAGES"],
        });
    }
    async exec(message, args) {
        const evaled = args.join(' ');
        try {
            if (evaled) {
                const evaluated = await eval(evaled, { depth: 0 });

                await message.channel.sendTyping();
                const msg = await message.reply("> Evaluating..");
                const emb = embed()
                    .setColor('2f3136')
                    .addFields({
                        name: 'Input:\n```js\n' + `${evaled.substring(0, 1010)}` + '```',
                        value: 'Output:\n```js\n' + `${inspect(evaluated, { depth: 0}).substring(0, 1010)}` + '```'
                    })
                return msg.edit({ content: null, embeds: [emb] });
            } else {
                return message.reply("You need to specify some code!");
            }
        } catch (err) {
            return message.reply(`An error occurred: ${err.message}`);
        }
    }
>>>>>>> 103031f45b7d554641d33739715c97e3166ab11c
}