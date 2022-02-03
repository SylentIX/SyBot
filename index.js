const SyBot = require('./structures/Client');
const config = require('././config.json');

const client = new SyBot(config);

client.launch();