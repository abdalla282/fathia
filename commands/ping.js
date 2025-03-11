const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.deferReply(); // Defer first
        await interaction.editReply("🏓 Pong!"); // Then send the response
    }
};
