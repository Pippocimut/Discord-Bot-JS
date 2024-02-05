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
		.setName('sing-next')
		.setDescription('Shifts the playlist by 1'),
	async execute(interaction) {
            try {
                const connection = getVoiceConnection(interaction.member.guild.id)
                connection.state.subscription.player.stop(true);
                console.log("Moving to the next one");
                interaction.reply("I'm supposed to be doing my homework!")
        
            }catch(err){
                    console.log("Error in try catch next.js: "+err)
            }
	},
};