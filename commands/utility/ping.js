
const { SlashCommandBuilder, Collection } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('ping'),
	async execute(interaction) {
		await interaction.deferReply()
		await wait(1_000)
		await interaction.editReply('Pog');
		await wait(2_000);
		await interaction.editReply('I mean: Pong!')
		await wait(2_000);
		await interaction.followUp('Right?')
	},
};