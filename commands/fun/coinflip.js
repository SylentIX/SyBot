const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const numeral = require('numeral');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['flip', 'fl', 'cf'],
			description: 'Allows you to play / bid on a flip of a coin.',
            category: 'fun',
            usage: '[side] [amount]'
		});
	}

	run(message, args) {

        let sides = ['heads', 'tails'];

        let amount = Number(args[1]);

        if (!amount) return message.reply('You need to provide an amount of coins!');
        
        let coins = this.client.database.getCoins(message.author.id) || 0;

        if (!args[1]) return message.reply(stripIndents`You need to provide a side of a coin:
        - Use \`heads\` to bid on heads
        - Use \`tails\` to bid on tails
        `);

        if (args[1].toLowerCase() === 'heads' || args[1].toLowerCase() === 'tails') {

            if (!coins) return message.reply('You don\'t have any coins!');
            if (coins < amount) return message.reply('You don\'t have enough coins!');
    
            const random = Math.floor(Math.random() * sides.length);

            if (sides[random] === args[1].toLowerCase()) {

                message.channel.send('Flipping coin...').then(msg => {

                    msg.delete({ timeout: 1000 });

                }).then(() => {

                    setTimeout(() => {

                        let xpAddWin = 30;

                        this.client.database.addXp(message.author.id, xpAddWin);

                        this.client.logger.report(message.author.tag, xpAddWin, 'xp');
                        
                        this.client.database.addGambleGame(message.author.id);

                        this.client.database.addGambleWin(message.author.id);

                        message.reply(`I flipped: \`${sides[random]}\` - **You won**!`);

                        if (amount) {

                            this.client.database.payCoins(message.author.id, amount);
                            message.reply(`**${numeral(amount).format('0,0')}** coins have been added to your account.`);

                        };

                    }, 1000);

                });

            } else {

                message.channel.send('Flipping coin...').then(msg => {

                    msg.delete({ timeout: 1000 });

                }).then(() => {

                    setTimeout(() => {

                        let xpAddLose = 15;

                        this.client.database.addXp(message.author.id, xpAddLose);

                        this.client.logger.report(message.author.tag, xpAddLose, 'xp');
                        
                        this.client.database.addGambleGame(message.author.id);

                        this.client.database.addGambleLost(message.author.id, amount);

                        message.reply(`I flipped: \`${sides[random]}\` - **You lost**!`);

                        if (amount) {

                            this.client.database.chargeCoins(message.author.id, amount);
                            message.reply(`**${numeral(amount).format('0,0')}** coins have been charged from your account.`);

                        };

                    }, 1000);

                });

            };

        } else {

            return message.reply(stripIndents`You need to provide a side of a coin:
            - Use \`heads\` to bid on heads
            - Use \`tails\` to bid on tails
            `);

        };

    }
}