const { Events } = require('discord.js');
var giphy = require('giphy-api')('2p0MgTooLdZapQWEQOXDieT1nGZYihKZ')
const Curse = require('../models/curse')
const  curseList = require("../curse.json")

module.exports = {
	name: Events.MessageCreate,
	execute(interaction) {
		console.log("Interacting")
		/* if(interaction.member.user.id == 383322734731591680){
			const randomNum = Math.floor(Math.random() * 2) 
			switch(randomNum){
				case 1:
					return interaction.reply('Small pp man is talking!')
				case 2:
					return interaction.reply('STFU!')
				case 0:
					return interaction.reply('Yapping towns major is here!')
			}
			
		} */
		console.log(interaction)
		if(interaction.author.bot){
			return console.log("Bot talking")
		}

		var cursed = false;
		try {
			curseList.curse.forEach(curse => {
				if(interaction.content.trim().toLowerCase().includes(curse)){
					cursed	= true
					throw Error
			}
			})
		} catch (error) {
			console.log("All according to plan")
		}
		if(cursed){
			const curseLog = new Curse({
				message: interaction.content,
				date: Date.now(),
				name: interaction.author.username,
				userDiscordId: interaction.author.id
			})
			console.log(curseLog)
			return curseLog.save().then(result => {
				return interaction.reply("Non dire parolacce se no chiamo la poolizia")
			}).catch(err => {
				console.log("error")
				interaction.reply("You got lucky this time")
			})
			
		}
		if(interaction.content.startsWith("Show me a memes")){
			var search = interaction.content.split(" ").splice(4).join(" ")
			const offset = Math.floor(Math.random() * 25) 
			console.log(search)
			return giphy.search({
				q: search,
				limit: 1,
				offset: offset
			}).then(function (res) {
				interaction.reply(res.data[0].bitly_url)
			});
		}
		if (interaction.content === 'Beg for your life little robot') {
			return interaction.reply('Oh please <@383322734731591680> dont ban me Ill suck your toes, oh please forgive me');
		}
		if (interaction.content === 'Computer scan for homosexual activity') {
			return interaction.reply('Gay ass motherfucker found: <@383322734731591680>');
		};
		if (interaction.content === 'Test') {
			return interaction.reply('Dont test me buddy!');
		};
		if (interaction.content === 'Sorry bro') {
			return interaction.reply("'S all good man");
		};
		if (interaction.content === 'Dab me up bro') {
			return interaction.reply("Dab me up fam");
		};

	},
};