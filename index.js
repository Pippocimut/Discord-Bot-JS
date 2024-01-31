const dotenv = require('dotenv')
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
dotenv.config() //initializes dotenv
const {Client, Intents, GatewayIntentBits} = require('discord.js'); //imports discord.js

const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates] 
        }); //creates new client

const player = createAudioPlayer();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.once('ready', () => {
    console.log('Ready!');
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('messageCreate',async msg => {
    const args = msg.content.split(" ");
    if(args[0].toString().startsWith("!play")){

        const voiceChannel = msg.member.voice.channel;

        try {
            // Here we try to join the voicechat and save our connection into our object.
            const player = createAudioPlayer();
            const connection = joinVoiceChannel({
                        channelId: voiceChannel.id,
                        guildId: voiceChannel.guild.id,
                        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                    }).subscribe(player);

            //console.log("URL: "+song.url)
            const stream = await ytdl(args[1])
            const resource = createAudioResource(stream);
            player.play(resource);

           }catch(err){
                console.log("Error in try catch: "+err)
           }
        
    }
    if (msg.content === 'Beg for your life little robot') {
        msg.reply('Oh please <@383322734731591680> dont ban me Ill suck your toes, oh please forgive me');
    }
    if (msg.content === 'Computer scan for homosexual activity') {
        msg.reply('Gay ass motherfucker fund: <@383322734731591680>');
    }
  });


  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }

client.on('messageCreate', msg => {
    console.log("Message recieved")
    
  });

client.login(process.env.CLIENT_TOKEN); //signs the bot in with token