const Bot = require("./core/bot");
require('dotenv').config();

const client = new Bot();

client.start(process.env.TOKEN);