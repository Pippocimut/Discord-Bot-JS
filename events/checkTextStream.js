const { Events } = require('discord.js');
var giphy = require('giphy-api')('2p0MgTooLdZapQWEQOXDieT1nGZYihKZ')
const Curse = require('../models/curse')
const  curseList = require("../curse.json")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
		console.log("Interacting")

		if(interaction.author.bot){
			return console.log("Bot yapping")
		}

		if(interaction.member.user.id == 383322734731591680){
			//annoyGiuggi(interaction)
		}

		if(hasCurse(interaction.content)){
			return curseHandler(interaction);
		}
		switch(true){
			case interaction.content.includes("beg"): 
				return interaction.reply('Oh please <@383322734731591680> dont ban me Ill suck your toes, oh please forgive me master');

			case interaction.content === 'Computer scan for homosexual activity':
				return gayDetector(interaction)

			case interaction.content === 'Test': 
				return interaction.reply('Dont test me buddy!');

			case interaction.content.includes('Sorry bot'): 
				return interaction.reply("'S all good man");
			
			case interaction.content ===  'Dab me up bro':
				return interaction.reply("Dab me up fam");
		};

	},
};


function gayDetector(interaction){
	return interaction.reply('Gay ass motherfucker found: <@383322734731591680>');
}
function annoyGiuggi(interaction){
	const randomNum = Math.floor(Math.random() * 2) 
			switch(randomNum){
				case 1:
					return interaction.reply('Small pp man is talking!')
				case 2:
					return interaction.reply('STFU!')
				case 0:
					return interaction.reply('Yapping towns major is here!')
			}
}

function hasCurse(value){
	var cursed = false;
		try {
			curseList.curse.forEach(curse => {
				if(value.trim().toLowerCase().includes(curse)){
					cursed	= true
					throw Error
			}
			})
		} catch (error) {
			console.log("All according to plan")
		}
	return cursed;
}
function curseHandler(interaction){
	const curseLog = new Curse({
		message: interaction.content,
		date: Date.now(),
		name: interaction.author.username,
		userDiscordId: interaction.author.id
	})
	return curseLog.save().then(result => {
		return interaction.reply("Non dire parolacce se no chiamo la poolizia")
	}).catch(err => {
		return interaction.reply("You got lucky this time")
	})
}