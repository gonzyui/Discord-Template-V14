const mongoose = require('mongoose');

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
            console.log('✅ Connected to MongoDB with Mongoose!');
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
}

module.exports = Mongo;
