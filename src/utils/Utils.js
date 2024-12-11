<<<<<<< HEAD
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = class Util {
    constructor(client) {
        this.client = client;
    }

    static embed(client) {
        return new EmbedBuilder().setColor('Orange').setFooter({ iconURL: client.user.displayAvatarURL(), text: client.user.username}).setTimestamp(new Date());
    }

    static button() {
        return new ButtonBuilder();
    }

    static rowBuilder() {
        return new ActionRowBuilder();
    }

    static formatPerms(perm) {
        return perm
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (string) => string.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/To/g, 'to')
            .replace(/And/g, 'and')
            .replace(/Guild/g, 'Server')
            .replace(/Tts/g, 'Text-to-Speech')
            .replace(/Use Vad/g, 'Use Voice Acitvity');
    }

    static formatArray(array, type = 'conjunction') {
        return new Intl.ListFormat('en-GB', { style: 'short', type: type}).format(array);
    }

    static removeDuplicates(arr) {
        return [...new Set(arr)];
    }
=======
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = class Util {
    constructor(client) {
        this.client = client;
    }

    static embed() {
        return new EmbedBuilder();
    }

    static button() {
        return new ButtonBuilder();
    }

    static rowBuilder() {
        return new ActionRowBuilder();
    }

    static formatPerms(perm) {
        return perm
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (string) => string.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/To/g, 'to')
            .replace(/And/g, 'and')
            .replace(/Guild/g, 'Server')
            .replace(/Tts/g, 'Text-to-Speech')
            .replace(/Use Vad/g, 'Use Voice Acitvity');
    }

    static formatArray(array, type = 'conjunction') {
        return new Intl.ListFormat('en-GB', { style: 'short', type: type}).format(array);
    }

    static removeDuplicates(arr) {
        return [...new Set(arr)];
    }
>>>>>>> 103031f45b7d554641d33739715c97e3166ab11c
}