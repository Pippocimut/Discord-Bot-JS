
const { SlashCommandBuilder, Collection } = require('discord.js');
var giphy = require('giphy-api')('2p0MgTooLdZapQWEQOXDieT1nGZYihKZ')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Pronounced GIF').addStringOption(option =>
            option.setName("prompt")
            .setDescription("The prompt of the GIF")
            .setRequired(true)
        ),
	async execute(interaction) {
		await interaction.reply(await memes(interaction.options.getString("prompt")))
	},
};

async function memes(search){
	const offset = Math.floor(Math.random() * 25) 
	console.log(search)
	return await giphy.search({
		q: search,
		limit: 1,
		offset: offset
	}).then(function (res) {
		return res.data[0].bitly_url
	});
    
}