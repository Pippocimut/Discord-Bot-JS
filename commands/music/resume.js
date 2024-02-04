const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core')
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
    getVoiceConnection
} = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sing-resume')
		.setDescription('Resumes a song'),
	async execute(interaction) {
            try {
                const connection = getVoiceConnection(interaction.member.guild.id)
                connection.state.subscription.player.unpause();
                interaction.reply("I'm supposed to be resuming a song")
        
            }catch(err){
                    console.log("Error in try catch resume.js: "+err)
            }
	},
};