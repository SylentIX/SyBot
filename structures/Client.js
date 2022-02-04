const Utils = require('./Utils.js');
const Logger = require('./Logger.js');
const Database = require('./Database.js');
const { Client, Collection, Intents } = require('discord.js');
const keepAlive = require('../server.js');

module.exports = class SyBot extends Client {

	constructor(options = {}) {

		super({
			disableMentions: 'everyone',
			intents: [Intents.FLAGS.GUILDS]
		});

		this._validateOptions();

		this.commands = new Collection();

		this.aliases = new Collection();

		this.events = new Collection();

		this.utils = new Utils(this);

		this.logger = new Logger(this);

		this.database = new Database(this);

		this.token = options.token;

		this.prefix = options.prefix;

		this.owner = options.owner;

	}

	async launch(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		super.login(token);
		keepAlive();
	}

}