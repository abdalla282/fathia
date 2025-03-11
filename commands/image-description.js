const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

const API_URL = "https://openrouter.ai/api/v1/chat/completions"; // OpenRouter API

module.exports = {
    data: new SlashCommandBuilder()
        .setName("image-description")
        .setDescription("AI generates a description of an image.")
        .addStringOption(option =>
            option.setName("url")
                .setDescription("The image URL")
                .setRequired(true)
        ),
    async execute(interaction) {
        const imageUrl = interaction.options.getString("url");

        await interaction.deferReply();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "qwen/qwen2.5-vl-72b-instruct:free",
                    messages: [
                        { role: "system", content: "Describe the following image in detail." },
                        { role: "user", content: `Describe this image: ${imageUrl}` }
                    ]
                })
            });

            const data = await response.json();
            const description = data.choices?.[0]?.message?.content || "I couldn't generate a description.";

            await interaction.editReply(`🖼 **Image Description:** ${description}`);
        } catch (error) {
            console.error("Error fetching AI description:", error);
            await interaction.editReply("❌ Failed to get an image description.");
        }
    }
};
