require('dotenv').config();

const Bot = require('./src/struct/Bot');

(async () => {
    const bot = new Bot();
    await bot.start(process.env.TOKEN);
})();
