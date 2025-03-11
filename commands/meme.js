const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Sends a random meme"),
    async execute(interaction) {
        await interaction.deferReply();
        
        try {
            const response = await fetch("https://meme-api.com/gimme");
            const data = await response.json();

            if (!data.url) {
                throw new Error("Invalid API response");
            }

            await interaction.editReply({ content: data.url });
        } catch (error) {
            console.error("Meme API Error:", error);
            await interaction.editReply("❌ Failed to fetch meme. Try again later.");
        }
    }
};
