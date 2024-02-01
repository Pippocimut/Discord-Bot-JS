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
} = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sing-pause')
		.setDescription('Gets Youtube Link and plays the song'),
	async execute(interaction) {
            const url = interaction.options.getString("url");
            const member = interaction.guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            try {

                const connection = joinVoiceChannel({
                            channelId: voiceChannel.id,
                            guildId: voiceChannel.guild.id,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        })
                console.log("Connection created");
                connection.state.subscription.player.pause();
                interaction.reply("I'm supposed to pause");
        
            }catch(err){
                    console.log("Error in try catch: "+err)
            }
	},
};