const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("randomdog")
        .setDescription("Sends a random dog picture"),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            await interaction.editReply(data.message);
        } catch (error) {
            console.error(error);
            await interaction.editReply("❌ Failed to fetch dog image.");
        }
    }
};
