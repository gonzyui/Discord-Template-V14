const mongoose = require('mongoose');
const Guild = require('./models/Guild');

class Mongo {
    constructor(uri, options = {}) {
        this.uri = uri;
        this.options = {
            dbName: 'mongodbBot',
            timeoutMS: 30000,
            ...options,
        };

        mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
        mongoose.connection.on('error', (error) => console.error("MongoDB Error: ", error));
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, this.options);
        } catch (error) {
            console.error('🚨 Connection error:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('👋 Disconnected from MongoDB');
        } catch (error) {
            console.error('🚨 Disconnection error:', error);
            throw error;
        }
    }

    async createGuild(guildId) {
        try {
            const newGuild = await Guild.create({ guildId });
            console.log(`Created guild: ${guildId}`);
            return newGuild;
        } catch (error) {
            console.error(`Failed to create guild: ${error}`);
            throw error;
        }
    }

    async getGuild(guildId) {
        try {
            let data = await Guild.findOne({ guildId });
            if (!data) {
                data = await this.createGuild(guildId);
            }
            return data;
        } catch (error) {
            console.error(`Failed to get guild: ${error}`);
            throw error;
        }
    }

    async updateGuild(guildId, update) {
        try {
            const updatedGuild = await Guild.findOneAndUpdate(
                { guildId },
                { $set: update },
                { new: true, upsert: true },
            );
            console.log(`Updated guild: ${guildId}`);
            return updatedGuild;
        } catch (error) {
            console.error(`Failed to update guild: ${error}`);
            throw error;
        }
    }

    async deleteGuild(guildId) {
        try {
            await Guild.deleteOne({ guildId });
            console.log(`Deleted guild: ${guildId}`);
            return guildId;
        } catch (error) {
            console.error(`Failed to delete guild: ${error}`);
            throw error;
        }
    }
}

module.exports = Mongo;
