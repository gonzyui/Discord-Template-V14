const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    settings: {
        language: { type: String, default: 'en' },
    }
}, { timestamps: true });

module.exports = mongoose.model('Guild', guildSchema);