const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Ask the magic 8-ball a question")
        .addStringOption(option =>
            option.setName("question")
                .setDescription("Your question for the 8-ball")
                .setRequired(true)
        ),
    async execute(interaction) {
        const responses = [
            "Yes, absolutely! 🎱",
            "No way! ❌",
            "Maybe... 🤔",
            "Ask again later. ⏳",
            "It is certain! ✅",
            "Very doubtful. 🤨"
        ];
        const reply = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(`🎱 ${reply}`);
    }
};
