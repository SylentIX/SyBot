const Utils = require('./Utils.js');
const Logger = require('./Logger.js');
const Database = require('./Database.js');
const { Client, Collection } = require('discord.js');
const keepAlive = require('../server.js');

module.exports = class RaeClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.events = new Collection();

		this.utils = new Utils(this);

		this.logger = new Logger(this);

		this.database = new Database(this);

		this.owner = options.owner;
		
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;
	}

	async launch(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		super.login(token);
		keepAlive();
	}

}