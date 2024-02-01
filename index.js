const dotenv = require('dotenv')
const ytdl = require('ytdl-core')
const fs = require('fs');
const path = require('path');
const initialize = require('./deploy-commands');
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
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js'); //imports discord.js
const { Console } = require('console');

const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates] 
        }); //creates new client

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});



client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()){
        console.log(interaction)
        return;}

	console.log(interaction);
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

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
        msg.reply('Gay ass motherfucker found: <@383322734731591680>');
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
 
initialize.InitializeCommands()
client.login(process.env.CLIENT_TOKEN);
