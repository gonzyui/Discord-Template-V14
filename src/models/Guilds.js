<<<<<<< HEAD
const { Schema, model } = require('mongoose');

module.exports = model('Guilds', new Schema({
    guildID: { type: String },
    prefix: { type: String, default: 'p!' },
=======
const { Schema, model } = require('mongoose');

module.exports = model('Guilds', new Schema({
    guildID: { type: String },
    prefix: { type: String, default: 'p!' },
>>>>>>> 103031f45b7d554641d33739715c97e3166ab11c
}))