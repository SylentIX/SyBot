const Event = require('../structures/Event');
const db = require('better-sqlite3')('./database.db');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
        }
        
        run() {

                this.client.logger.ready(`Logged in as ${this.client.user.tag}.`);
                this.client.logger.ready(`Successfully loaded ${this.client.commands.size} commands.`);
                this.client.logger.ready(`Successfully loaded ${this.client.events.size} events.`);

                this.client.user.setActivity(`${this.client.prefix}help`, { type: 'WATCHING' });

                db.prepare('CREATE TABLE IF NOT EXISTS xp(username TEXT, id INTEGER, xp INTEGER, level INTEGER, next INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS coins(username TEXT, id INTEGER, coins INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS messages(username TEXT, id INTEGER, global INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS logs(guildname TEXT, guildid INTEGER, channelname TEXT, channelid INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS prefixes(guildname TEXT, guildid INTEGER, prefix TEXT)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS commands(name TEXT, ran INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS bios(username TEXT, id INTEGER, bio TEXT)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS colors(username TEXT, id INTEGER, hex TEXT)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS dailies(username TEXT, id INTEGER, last INTEGER, next INTEGER, claims INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS autoroles(guildname TEXT, guildid INTEGER, rolename TEXT, roleid INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS gambles(username TEXT, id INTEGER, wins INTEGER, games INTEGER, lost INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS gems(username TEXT, id INTEGER, gems INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS boosters(username TEXT, id INTEGER, type TEXT, end INTEGER)').run();
                db.prepare('CREATE TABLE IF NOT EXISTS notifications(guildname TEXT, guildid INTEGER, type TEXT)').run();

        };
}