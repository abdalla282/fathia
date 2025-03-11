const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("randomcat")
        .setDescription("Sends a random cat picture"),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();
            await interaction.editReply(data[0].url);
        } catch (error) {
            console.error(error);
            await interaction.editReply("❌ Failed to fetch cat image.");
        }
    }
};
