const { SlashCommandBuilder, ReactionUserManager } = require('discord.js');
const ytdl = require('ytdl-core')
const ytpl = require('ytpl');
const fs = require("fs")
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
    getVoiceConnection,

} = require('@discordjs/voice');
const { info } = require('node-sass');
const play = require('play-dl');
const {Collection} = require('discord.js'); //imports discord.js
const { get } = require('http');

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
            
            if(!voiceChannel){
                return interaction.reply("Yo you gotta be in a voice channel to make me sing")
            }
            try {

                queue = [];

                if(ytdl.validateURL(url)){
                    console.log("Song found")
                    queue = [url]
                }
                else if(ytpl.validateID(url)){
                    console.log("Playlist found")
                    const playlist = await ytpl(url);
                    queue = playlist.items.map(p =>  p.url);
                }

                const player = await initializeAudioPlayer(queue,interaction.member.guild.id)

                const connection = joinVoiceChannel({
                            channelId: voiceChannel.id,
                            guildId: voiceChannel.guild.id,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        })

                connection.queue = queue
                connection.subscribe(player);

                interaction.reply("I'm supposed to be playing a song")
        
            }catch(err){
                    console.log("Error in try catch play.js: "+ err)
            }
	},
};

async function getSong(url){
    stream =  await play.stream(url)
    const resource = createAudioResource(stream.stream, {
        inputType : stream.type
    })
    return resource
}
async function initializeAudioPlayer(queue,guild_id){
    
    const player = createAudioPersonalizedPlayer(guild_id);
    const resource = await getSong(queue[0])
    player.play(resource);
    return player
}

function createAudioPersonalizedPlayer(guild_id){
    const player = createAudioPlayer();

    player.on = (AudioPlayerStatus.Idle, async () => {

        const connection = getVoiceConnection(guild_id)

        connection.queue.shift()

        if(connection.queue[0]){
            const resource = await getSong(connection.queue[0])
            player.play(resource);
            
        }
        else{
            connection.destroy()
        }
    });

    return player;
}