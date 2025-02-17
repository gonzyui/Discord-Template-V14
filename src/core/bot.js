const { Client, Collection } = require('discord.js');
const Mongo = require('./mongo');

class Bot extends Client {
    constructor() {
        super({
            intents: ["Guilds"],
        });
        this.events = new Collection();
        this.commands = new Collection();
        this.database = new Mongo(process.env.MONGO_URI)
    }

    async start(token = String) {
        await this.database.connect();
        await super.login(token);
    }
}

module.exports = Bot;