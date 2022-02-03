const Event = require('../structures/Event');
const { MessageEmbed } = require('discord.js');
const colors = require('../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Event {

	async run(guild) {

		const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));

		channel.send(`Hi, I'm **${this.client.user.username}!**`);
		
		this.client.logger.info(`[+] Joined server ${guild.name} with ${guild.memberCount} members.`);
        
	}
}