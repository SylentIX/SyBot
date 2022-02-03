const Command = require('../../structures/Command');
const numeral = require('numeral');
const ms = require('ms');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['claim', 'da', 'dl'],
			description: 'Allows you to claim daily reward.',
            category: 'economy',
            usage: '[command]'
		});
	}

	run(message) {

        const nextClaim = this.client.database.getDaily(message.author.id) || 0;

        let now = Date.now();

        let tomorrow = new Date().setHours(23,59,59,999);

        let timeTilClaim = tomorrow - now;

        let reward = 50;

        if (now > nextClaim || !nextClaim) {

            this.client.database.payCoins(message.author.id, reward);

            const embed = new MessageEmbed()
            .setTitle(message.author.tag)
            .setColor(colors.yellow)
            .setAuthor('Daily Reward')
            .setDescription(`Successfully claimed daily reward of **${reward}** coins!`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);

            this.client.database.setDaily(message.author.id, now, tomorrow, 1);

        };

        if (now < nextClaim) {

            return message.reply(`You need to wait **${ms(timeTilClaim, { long: true })}** til you can claim daily reward again!`);
            
        };
        
    }
}