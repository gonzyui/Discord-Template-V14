const LanguageManager = require ('./languageManager');
const { Client, Collection } = require('discord.js');
const Mongo = require('./mongo');
const path = require('path');
const fs = require('fs');

class Bot extends Client {
    constructor() {
        super({
            intents: ["Guilds"],
        });
        this.events = new Collection();
        this.commands = new Collection();
        this.database = new Mongo(process.env.MONGO_URI);
        this.languageManager = new LanguageManager("en");
    }

    async start(token = String) {
        this.loadEvents();
        await this.database.connect();
        await super.login(token);
    }

    loadEvents() {
        const eventsPath = path.join(__dirname, '../events');
        const categories = fs.readdirSync(eventsPath);

        for (const category of categories) {
            const categoryPath = path.join(eventsPath, category);
            const eventFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

            for (const file of eventFiles) {
                const eventPath = path.join(categoryPath, file);
                try {
                    const EventClass = require(eventPath);
                    const eventInstance = new EventClass();

                    if (!eventInstance.name || typeof eventInstance.execute !== 'function') {
                        console.warn(`Skipping event in ${eventsPath}: missing name or execute method.`);
                        continue;
                    }
                    this.events.set(eventInstance.name, eventInstance);
                    console.log(`Loaded event: ${eventInstance.name}`);

                    if (eventInstance.event) {
                        this.on(eventInstance.event, (...args) => eventInstance.execute(this, ...args));
                    }
                } catch (error) {
                    console.error(`Error loading event: ${eventPath}: ${error}`);
                }
            }
        }
    }

    async loadCommands() {
        const commandsArray = [];
        const commandsPath = path.join(__dirname, '../commands');
        const categories = fs.readdirSync(commandsPath);

        for (const category of categories) {
            const categoryPath = path.join(commandsPath, category);
            const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const commandPath = path.join(categoryPath, file);
                try {
                    const CommandClass = require(commandPath);
                    const commandInstance = new CommandClass();

                    if (!commandInstance.name || !commandInstance.data || typeof commandInstance.execute !== 'function') {
                        console.warn(`Skipping command: ${commandPath}: missing required properties.`);
                        continue;
                    }

                    this.commands.set(commandInstance.name, commandInstance);
                    commandsArray.push(commandInstance.data.toJSON());
                } catch (error) {
                    console.error(`Error loading command: ${commandPath}: ${error}`);
                }
            }
        }
        try {
            await this.application.commands.set(commandsArray);
            console.log(`Loaded commands: ${commandsArray.length}`);
        } catch (error) {
            console.error(`Error loading command: ${error}`);
        }
    }
}

module.exports = Bot;