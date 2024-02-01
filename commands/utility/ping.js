
const { SlashCommandBuilder, Collection } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('coglione')
		.setDescription('Insults you'),
	async execute(interaction) {
		await interaction.deferReply()
		await wait(1_000)
		await interaction.editReply('Are you refering to: Yourself?');
		await wait(2_000);
		await interaction.editReply('I thought so')
		await interaction.followUp('Yo mama fat af')
	},
};