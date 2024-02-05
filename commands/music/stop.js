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
		.setName('sing-stop')
		.setDescription('Gets Youtube Link and plays the song'),
	async execute(interaction) {
            try {
				const connection = getVoiceConnection(interaction.member.guild.id)
				connection.destroy()
                interaction.reply("I'm supposed to be stopping a song")
        
            }catch(err){
                    console.log("Error in try catch stop.js: "+err)
            }
	},
};