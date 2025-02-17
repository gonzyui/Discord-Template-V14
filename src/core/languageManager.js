const path = require('path');
const { Collection } = require("discord.js");
const fs = require('fs');

module.exports = class LanguageManager {
    constructor(defaultLang = 'en') {
        this.languages = new Collection();
        this.defaultLang = defaultLang;
        this.loadLanguages();
    }

    loadLanguages() {
        const languagesPath = path.join(__dirname, '../languages');
        const languageFiles = fs.readdirSync(languagesPath).filter(file => file.endsWith('.json'));

        for (const file of languageFiles) {
            const langCode = path.basename(file, '.json');
            const filePath = path.join(languagesPath, file);
            try {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                this.languages.set(langCode, data);
                console.log(`Loaded language: ${langCode}`);
            } catch (error) {
                console.error(`Error while trying to load language: ${filePath}: ${error}`);
            }
        }
    }

    getTranslation(lang, key, placeholders = {}) {
        const languageData = this.languages.get(lang) || this.languages.get(this.defaultLang);
        let translation = languageData?.[key] || key;

        for (const [placeholder, value] of Object.entries(placeholders)) {
            translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), value);
        }
        return translation;
    }
}