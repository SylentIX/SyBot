const Event = require('../structures/Event');
const { stripIndents } = require('common-tags');
const numeral = require('numeral');

module.exports = class extends Event {

	async run(message) {

		const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

		if (!message.guild || message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.database.getPrefix(message.guild.id) ? this.client.database.getPrefix(message.guild.id) : this.client.prefix}\`.`);

		const prefix = this.client.database.getPrefix(message.guild.id) ? this.client.database.getPrefix(message.guild.id) : this.client.prefix;

		const finalPrefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;

		const [cmd, ...args] = message.content.slice(finalPrefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

		if (command) {

			if (!message.content.startsWith(finalPrefix)) return;

			command.run(message, args);

			this.client.logger.cmd(`${message.author.tag} ran ${command.name} in ${message.guild.name}.`);

			this.client.database.addCommand(command.name);

			let xpAdd = 7;

			this.client.database.addXp(message.author.id, xpAdd);

			this.client.logger.report(message.author.tag, xpAdd, 'xp');
		}

		this.client.database.addMessage(message.author.id);

		let xpAdd = Math.floor(Math.random() * 15) + 2;

		this.client.database.addXp(message.author.id, xpAdd);
	
		this.client.logger.report(message.author.tag, xpAdd, 'xp');

		let lvl = this.client.database.getLvl(message.author.id);
		let xp = this.client.database.getXp(message.author.id);
		let nxtLvlXp = this.client.database.getNextLvl(message.author.id);
		let newLvl = lvl + 1
		let levelReward = 10;
		
		if (nxtLvlXp <= xp) {

			this.client.database.addLvl(message.author.id, 1);

			this.client.database.addNextLvl(message.author.id);

			this.client.database.payGems(message.author.id, levelReward);

			if (this.client.database.getNotification(message.guild.id, 'lvlup')) {

				message.channel.send(stripIndents`
				Congrats ${message.author}, you leveled up!
				You are now level **${newLvl}** *(**+${numeral(levelReward).format('0,0')}** gems)*. 
				`);

			};

			this.client.logger.report(message.author.tag, '1', 'lvl');

		};
		
		let baseChance = Math.floor(Math.random() * 10);

		let coinChance = Math.floor(Math.random() * 10);

		let coinAdd = Math.floor(Math.random() * 5);

		if (coinChance = baseChance) {

			if (booster) {

				if (booster.type === 'DOUBLE COIN BOOSTER') {

					this.client.database.payCoins(message.author.id, coinAdd * 2);

					this.client.logger.report(message.author.tag, coinAdd * 2, 'coins');
	
				};

				if (booster.type === 'TRIPLE COIN BOOSTER') {

					this.client.database.payCoins(message.author.id, coinAdd * 3);

					this.client.logger.report(message.author.tag, coinAdd * 3, 'coins');
	
				};
				
				if (booster.type === 'PENTA COIN BOOSTER') {

					this.client.database.payCoins(message.author.id, coinAdd * 5);

					this.client.logger.report(message.author.tag, coinAdd * 5, 'coins');

				};

			} else {

				this.client.database.payCoins(message.author.id, coinAdd);

				this.client.logger.report(message.author.tag, coinAdd, 'coins');

			};

		};

	}

}