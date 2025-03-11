const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("summarize")
        .setDescription("Summarizes a given text using AI")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("The text to summarize")
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        const text = interaction.options.getString("text");

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "qwen/qwen2.5-vl-72b-instruct:free",  // You can change the model
                    messages: [{ role: "user", content: `Summarize the following text:\n\n${text}` }],
                    max_tokens: 100
                })
            });

            const data = await response.json();

            if (data.error) {
                return interaction.editReply(`❌ Error: ${data.error.message}`);
            }

            const summary = data.choices?.[0]?.message?.content || "No summary generated.";
            await interaction.editReply(`📝 **Summary:**\n${summary}`);
        } catch (error) {
            console.error("Summarization error:", error);
            await interaction.editReply("❌ Failed to summarize the text. Please try again.");
        }
    }
};
