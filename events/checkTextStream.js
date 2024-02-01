const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: true,
	execute(interaction) {
		console.log(interaction)
		if (interaction.content === 'Beg for your life little robot') {
			interaction.reply('Oh please <@383322734731591680> dont ban me Ill suck your toes, oh please forgive me');
		}
		if (interaction.content === 'Computer scan for homosexual activity') {
			interaction.reply('Gay ass motherfucker found: <@383322734731591680>');
		};
		if (interaction.content === 'Test') {
			interaction.reply('Dont test me buddy!');
		};
		if (interaction.content === 'Sorry bro') {
			interaction.reply("'S all good man");
		};
		if (interaction.content === 'Dab me up bro') {
			interaction.reply("Dab me up fam");
		};

	},
};