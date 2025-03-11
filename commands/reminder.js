const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reminder")
        .setDescription("Sets a reminder")
        .addIntegerOption(option => 
            option.setName("time")
                .setDescription("Time in seconds before reminder")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("message")
                .setDescription("Reminder message")
                .setRequired(true)),
    async execute(interaction) {
        const time = interaction.options.getInteger("time");
        const message = interaction.options.getString("message");

        await interaction.reply(`⏳ Reminder set! I’ll remind you in ${time} seconds.`);
        
        setTimeout(() => {
            interaction.followUp(`🔔 Reminder: ${message}`);
        }, time * 1000);
    }
};
