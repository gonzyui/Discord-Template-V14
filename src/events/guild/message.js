const { formatArray, formatPerms } = require('../../utils/Utils');
const { Events, Collection } = require('discord.js');
const UserModel= require('../../models/Users');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(client, message) {
        if (message.author.bot || !message.guild) return false;
        let userData = await UserModel.findOne({ userID: message.author.id});
        if (!userData) {
            userData = new UserModel({
                xp: 0,
                level: 1,
                userID: message.author.id
            });
            await userData.save();
        }
        //const xp = userData.xp ?? 0;
       // const level = userData.level ?? 1;
        userData.xp += Math.floor(Math.random() * 10) + 1;
        await userData.save();

        const currentXp = userData.xp;
        const currentLevel = userData.level;
        const requiredXp = currentLevel * 100;

        if (currentXp >= requiredXp) {
            userData.level += 1;
            userData.xp = 0;
            await userData.save();
            message.channel.send(`<@${message.author.id}> just passed to level ${userData.level} !`)
        }

        const data = {};
        if (message.guild) data.guild = await client.findGuild({guildID: message.guild.id});
        const prefix = data.guild?.prefix || 'p!' ;

        const mentionRegPrefix = RegExp(`^<@!?${client.user.id}>`);
        if (mentionRegPrefix.test(message.content)) {
            await message.channel.sendTyping();
            message.reply("Hi i'm your besto friendo! My prefix is \`" + prefix + "\`");
        }

        if(!message.content.startsWith(prefix)) return;
        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));
        if (command) {
            if (message.guild) {
                const memberCheck = command.memberPerms;
                if(memberCheck) {
                    const missing = message.channel.permissionsFor(message.member).missing(memberCheck);
                    if (missing.length) {
                        await message.channel.sendTyping();
                        return message.reply(`Oops! You need \`${formatArray(missing.map(formatPerms))}\` permission..`);
                    }
                }

                const clientCheck = command.clientPerms;
                if (clientCheck) {
                    const missing = message.channel.permissionsFor(message.guild.me).missing(clientCheck);
                    if (missing.length) {
                        await message.channel.sendTyping();
                        return message.reply(`Oops! I need \`${formatArray(missing.map(formatPerms))}\` permission..`);
                    }
                }
            }

            if (command.ownerOnly && !client.owners.includes(message.author.id)) {
                await message.channel.sendTyping();
                return message.reply('ftg')
            }
            if (!client.cooldowns.has(command.name)) {
                client.cooldowns.set(command.name, new Collection());
            }

            const now = Date.now();
            const timestamps = client.cooldowns.set(command.name);
            const cdAmount = command.cooldown;
            if (timestamps.has(message.author.id) && !client.owners.includes(message.author.id)) { // Will skip if user is the bot owner
                const expirationTime = timestamps.get(message.author.id) + cdAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`Oops! You need to wait **${timeLeft.toFixed(2)}** more seconds!`);
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cdAmount);
            try {
                await message.channel.sendTyping();
                await command.exec(message, args, data);
            } catch (err) {
                client.logger.error(err);
                await message.channel.sendTyping();
                return message.reply(`Oops! It seems an error as occurred when trying to handle MessageCreateEvent.`);
            }
        }
    },
};
