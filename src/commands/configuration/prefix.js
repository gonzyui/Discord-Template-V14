module.exports = class Prefix extends Command {
    constructor() {
        super({
            name: "prefix",
            aliases: ["pref"],
            description: "Change server's prefix!",
            usage: "<prefix>",
            category: "Configuration",
            ownerOnly: false,
            cooldown: 15000,
            memberPerms: ["ADMINISTRATOR"],
            clientPerms: ["SEND_MESSAGES"],
        });
    }
    async exec(message, [prefix], data) {
        if (!prefix) return message.reply(`You need to specify the new prefix you want!`);
        if (prefix.length > 3) return message.reply(`Oops! Prefix cannot be longer than 3 characters!`);
        data.guild.prefix = prefix;
        await data.guild.save();
        return message.reply(`>> Prefix changed to ${prefix}`);
    }
}