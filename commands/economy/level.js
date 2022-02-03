const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['lvl', 'xp'],
            description: 'Displays user\'s level & xp information.',
            category: 'economy',
            usage: '[command | user]'
        });
    }

    run(message) {

        if (!message.mentions.users.size) {

            let xp = numeral(this.client.database.getXp(message.author.id)).format('0,0') || 0;
            let lvl = this.client.database.getLvl(message.author.id) || 0;
            let nxtLvlXp = this.client.database.getNextLvl(message.author.id);
            let difference = nxtLvlXp - this.client.database.getXp(message.author.id);

            return message.reply(`You are level **${lvl}** *(${xp} xp)* and you need **${difference} xp** til next level.`);

        } else {

            let user = message.mentions.users.first();

            let xp = numeral(this.client.database.getXp(user.id)).format('0,0') || 0;
            let lvl = this.client.database.getLvl(user.id) || 0;
            let nxtLvlXp = this.client.database.getNextLvl(user.id);
            let difference = nxtLvlXp - this.client.database.getXp(user.id);

            return message.reply(`${user} is level **${lvl}** *(${xp} xp)* and needs **${difference} xp** til next level.`);
            
        };

    }
}