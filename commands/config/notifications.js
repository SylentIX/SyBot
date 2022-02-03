const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['noti', 'notify', 'alert'],
            description: 'Allows you to manage bot notifications for your server.',
            category: 'config',
            usage: '<notification type>'
        });
    }

    run(message, args) {

        const types = ['lvlup'];

        const typesFull = {
            'lvlup': 'Level Up'
        };

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        if (!args[0]) return message.reply('You need to provide a notification type!');
        
        if (types.includes(args[0].toLowerCase())) {

            let notification = this.client.database.getNotification(message.guild.id, args[0]);

            let status = this.client.database.getNotification(message.guild.id, args[0]) ? 'disabled' : 'enabled';

            if (!notification) {
                this.client.database.addNotification(message.guild.id, args[0]);
            } else {
                this.client.database.deleteNotification(message.guild.id, args[0]);
            }
    
            return message.channel.send(`Successfully **${status}** ${typesFull[args[0]]} notifications.`);

        } else {

            return message.reply(stripIndents`You need to provide a valid notification type:
            \`\`\`${types.join(', ')}\`\`\`
            `);

        };
        
    }
}