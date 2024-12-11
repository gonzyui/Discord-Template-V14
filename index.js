<<<<<<< HEAD
require('dotenv').config();

const Bot = require('./src/struct/Bot');

(async () => {
    const bot = new Bot();
    await bot.start(process.env.TOKEN);
})();
=======
require('dotenv').config();

const Bot = require('./src/struct/Bot');

(async () => {
    const bot = new Bot();
    await bot.start(process.env.TOKEN);
})();
>>>>>>> 103031f45b7d554641d33739715c97e3166ab11c
