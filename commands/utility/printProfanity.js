
const { SlashCommandBuilder, Collection } = require('discord.js');
const Curse = require('../../models/curse')
const moment = require("moment")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('print-profanity')
		.setDescription('gives all profanity from a user').addStringOption(option =>
            option.setName("id")
            .setDescription("DiscordID")
            .setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply();
        console.log("deferring")
        const id = interaction.options.getString("id").replace(/[<>@]/g,"")
        console.log(id)
        
		Curse.find({userDiscordId :id}).select("message date")
        .then(profanities => {
            console.log(profanities)
            if(profanities.length>0){
                interaction.followUp("<@"+id+"> said");
                const pages = 5;
                var page_counter = 0
                var page_text = "\n"
                profanities.forEach(element => {
                    console.log("Printing")
                    page_counter += 1;
                    console.log(`${element.message} \n${moment(element.date).format("DD/MM/YYYY")}`)
                    page_text += ""+`${element.message} \n${moment(element.date).format("DD/MM/YYYY")}\n\n`
                    console.log(page_text);
                    if(page_counter == pages){
                        interaction.followUp(page_text)
                        page_counter = 0
                        page_text = "\n"
                    }
                });
                console.log(page_text)
                if(page_text !== "\n"){
                    interaction.followUp(page_text)
                }
            }
            else{
                interaction.editReply("Chief this guys is clean")
            }
        }).catch(err => {
            console.log(err)
            interaction.editReply("Errore segnor")
        });
        
	},
};

