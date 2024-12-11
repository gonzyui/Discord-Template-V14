const { Client, Collection, IntentsBitField, Partials } = require('discord.js');
const { connect, connection: db } = require('mongoose');
const { join} = require("node:path");
const { readdirSync, statSync} = require("node:fs");
const { resolve } = require('path');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest');

require('./Command');
require('./Interaction')

class Bot extends Client {
    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.MessageContent,
                IntentsBitField.Flags.DirectMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
            ],
            allowedMentions: {
                parse: ['users', 'roles']
            },
            partials: [Partials.Channel, Partials.Message, Partials.GuildMember, Partials.User]
        });
        // Utils
        this.logger = require('../utils/Logger.js');

        // Collections
        this.commands = new Collection();
        this.aliases = new Collection();
        this.interactions = new Collection();
        this.cooldowns = new Collection();

        this.owners = process.env.OWNERS.split(' ');

        // MongoDB Database
        this.database = {};
        this.guildsData = require('../models/Guilds');
        this.database.guilds = new Collection();

        /* Database events*/
        db.on('connected', async () => this.logger.log(`Connected to DB (Latency: ${Math.round(await this.databasePing())}ms)`, { tag: 'Database' }));
        db.on('disconnected', () => this.logger.error('Disconnected from DB', { tag: 'Database' }));
        db.on('error', (error) => this.logger.error(`Cannot initialize connection to DB!\nError: ${error}`, { tag: 'Database' }));
        db.on('reconnected', async () => this.logger.log(`Reconnected to DB! (Latency: ${Math.round(await this.databasePing())}ms)`, { tag: 'Database' }));
    }
    /*
    * Function for finding guild with ID into our DB
    */
    async findGuild({ guildID: guildId }, check) {
        if (this.database.guilds.get(guildId)) {
            return check ? this.database.guilds.get(guildId).toJSON() : this.database.guilds.get(guildId);
        } else {
            let guildData = check ? await this.guildsData.findOne({ guildID: guildId }).lean() : await this.guildsData.findOne({ guildID: guildId });
            if (guildData) {
                if (!check) this.database.guilds.set(guildId, guildData);
                return guildData;
            }  else {
                guildData = new this.guildsData({ guildID: guildId });
                await guildData.save();
                this.database.guilds.set(guildId, guildData);
                return check ? guildData.toJSON() : guildData;
            }
        }
    }
    /* Database */
    async loadDatabase() {
        return await connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async databasePing() {
        const cNano = process.hrtime();
        await db.db.command({ ping: 1 });
        const time = process.hrtime(cNano);
        return (time[0] * 1e9 + time[1]) * 1e-6;
    }
    /* Database */

    /* Bots loads functions */
    async loadEvents() {
        const eventsPath = resolve(__dirname, '../events');
        try {
            const eventFiles = this.getAllFiles(eventsPath);

            for (const file of eventFiles) {
                const event = require(file);
                if (event.once) {
                    this.once(event.name, (...args) => event.execute(this, ...args));
                } else {
                    this.on(event.name, (...args) => event.execute(this, ...args));
                }
            }

        } catch (error) {
            this.logger.error(`Erreur lors du chargement des commandes : ${error}`);
        }
    }

    async loadInteractions(guildId) {
        const intPath = resolve(__dirname, '../interactions');
        try {
            const intFile = this.getAllFiles(intPath);
            const cmds = [];

            for (const file of intFile) {
                const File = require(file);
                if (!(File.prototype instanceof Interaction)) return;
                const interaction = new File();
                interaction.client = this;
                this.interactions.set(interaction.name, interaction);
                cmds.push(interaction.toJSON());
            }
            const res = new REST({ version: '10' }).setToken(process.env.TOKEN);
            await res.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: cmds });

            /* Remove all commands, replave { body: [] } by 'commandID' for only one command
            * res.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
            *   .then(() => console.log("cbn plus de commande"))
            *   .catch(err => console.log(err));
            */
        } catch (error) {
            this.logger.error(`Erreur lors du chargement des commandes : ${error}`);
            console.log(error)
        }
    }

    async loadCommands() {
        const commandsPath = resolve(__dirname, '../commands');

        try {
            const commandFiles = this.getAllFiles(commandsPath);

            for (const file of commandFiles) {
                const File = require(file);
                if (!(File.prototype instanceof Command)) {
                    this.logger.error(`Le fichier ${file} n'est pas une commande valide.`);
                    continue;
                }
                const command = new File();
                command.client = this;
                this.commands.set(command.name, command);
                command.aliases.forEach((alias) => {
                    this.aliases.set(alias, command.name);
                });
            }
        } catch (error) {
            this.logger.error(`Erreur lors du chargement des commandes : ${error}`);
        }
    }

    getAllFiles(dirPath) {
        let results = [];
        const list = readdirSync(dirPath);

        for (let i = 0; i < list.length; i++) {
            const file = join(dirPath, list[i]);
            if (statSync(file).isDirectory()) {
                results = results.concat(this.getAllFiles(file));  // Appel récursif
            } else {
                if (file.endsWith('.js')) {
                    results.push(file);
                }
            }
        }
        return results;
    }
    /* Bots loads functions */

    /* Start function */
    async start(token) {
        await this.loadEvents();
        await this.loadDatabase();
        await this.loadCommands();
        await this.loadInteractions();
        return super.login(token);
    }
}

module.exports = Bot;
