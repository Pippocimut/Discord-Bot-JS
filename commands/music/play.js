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
const wait = require('node:timers/promises').setTimeout;
const play = require('play-dl');
const {Collection} = require('discord.js'); //imports discord.js
const { get } = require('http');
const { connect } = require('mongoose');
 


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

            var connection;
            var queue = [];
            var player;

            if(ytdl.validateURL(url)){
                console.log("Song found")
                queue.push(url)
            }
            else if(ytpl.validateID(url)){
                console.log("Playlist found")
                const playlist = await ytpl(url);
                queue.push(...playlist.items.map(p =>  p.url));
            }

            if(interaction.client.voice.adapters.size>0){
                connection = getVoiceConnection(interaction.member.guild.id)
                if(connection.queue)
                    connection.queue.push(...queue);
                if(connection.state.subscription.player)
                    player = connection.state.subscription.player
            }else{
                connection = joinVoiceChannel({
                            channelId: voiceChannel.id,
                            guildId: voiceChannel.guild.id,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        })
                player = createAudioPersonalizedPlayer(interaction.member.guild.id);
                connection.queue = queue
                player.play(await getSong(queue[0]),{bitrate: 96000})
                await wait(100)
                connection.queue.shift()
                connection.subscribe(player);
            }

            return interaction.reply("I'm supposed to be playing a song")
	},
};

async function getSong(url){
    stream =  await play.stream(url)
    const resource = createAudioResource(stream.stream, {
        inputType : stream.type
    })
    return resource
}

function createAudioPersonalizedPlayer(guild_id){
    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Idle, async () => {
        const connection = getVoiceConnection(guild_id)
        if(!connection){
            return interaction.reply("Bot not in voice chat")
        }
        await wait(50)
        console.log("I'm idle")
        if(connection.queue[0]){
            const resource = await getSong(await connection.queue[0])
            player.play(resource,{bitrate: 96000});
        }
        else{
            connection.destroy()
        }
        connection.queue.shift()
    });

    return player;
}