
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coglione')
		.setDescription('Insults you'),
	async execute(interaction) {
		await interaction.reply('Are you refering to: Yourself?');
	},
};