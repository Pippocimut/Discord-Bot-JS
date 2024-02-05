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
		.setName('sing-remove')
		.setDescription('Resumes a song')
        .addNumberOption(option =>
            option.setName("index")
            .setDescription("index of song")),
	async execute(interaction) {
            try {
                const connection = getVoiceConnection(interaction.member.guild.id)
                const queue = connection.queue
                const index = interaction.options.getNumber("index");
                console.log(queue.length)
                console.log(index)
                if(index<0){
                    return interaction.reply("Invalid index")
                }
                else if(index > queue.length){
                    return interaction.reply("Invalid index")
                }else if(index == 0){
                    return interaction.reply("Valid index")
                }
                else{
                    return interaction.reply("Valid index")
                }
        
            }catch(err){
                    console.log("Error in try catch resume.js: "+err)
            }
	},
};