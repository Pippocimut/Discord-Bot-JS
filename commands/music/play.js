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
		.setName('sing')
		.setDescription('Gets Youtube Link and plays the song')
        .addStringOption(option =>
            option.setName("url")
            .setDescription("The url to search for")
            .setRequired(true)
        ),
	async execute(interaction) {
            const url = interaction.options.getString("url");
            const member = interaction.guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            //console.log(member.guild.name)
            //console.log(voiceChannel)
            if(!voiceChannel){
                interaction.reply("Yo you gotta be in a voice channel to make me sing")
            }
            console.log(url)
            try {
                // Here we try to join the voicechat and save our connection into our object.
                const player = createAudioPlayer();
                const stream = await ytdl(url,{filter: "audioonly"})
                const resource = createAudioResource(stream);
                console.log(resource)
                player.play(resource);
                console.log("Player created")
                const connection = joinVoiceChannel({
                            channelId: voiceChannel.id,
                            guildId: voiceChannel.guild.id,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        })
                console.log("Connection created")
                const subscription = connection.subscribe(player);
                console.log("Subscription Created") 
                interaction.reply("I'm supposed to be playing a song")
        
            }catch(err){
                    console.log("Error in try catch: "+err)
            }
	},
};