const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("time")
        .setDescription("Shows the current time"),
    async execute(interaction) {
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-US", { hour12: false });
        await interaction.reply(`🕒 Current time: ${timeString}`);
    }
};
