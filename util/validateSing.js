
const {getVoiceConnection
} = require('@discordjs/voice');

module.exports = function validateSing(interaction){
	
	if(interaction.commandName.startsWith("sing")){
		if(message = checkSing(interaction))
			return message

		if(interaction.commandName.startsWith("sing-")){

			if(message = checkSingDash(interaction))
				return message

			if(["next","resume","pause"].includes(interaction.commandName.split("-")[1]))
				if(message = checkSingPlayer(interaction))
					return message
		}
	}
}


function checkSing(interaction){
	const member = interaction.guild.members.cache.get(interaction.member.user.id);
			const voiceChannel = member.voice.channel;
			if(!voiceChannel){
				return "Yo you gotta be in a voice channel to make me sing"
			}
}

function checkSingDash(interaction){
	console.log("Starts with sing-")
				const connection = getVoiceConnection(interaction.member.guild.id)
					if(!connection){
						return "Bot not in voice chat"
					}
}

function checkSingPlayer(interaction){
	console.log("Starts with sing-")
				const connection = getVoiceConnection(interaction.member.guild.id)
				if(!connection.state.subscription.player){
					return "No player working"
				}
}