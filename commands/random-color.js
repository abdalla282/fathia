const { SlashCommandBuilder } = require("discord.js");

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random-color")
        .setDescription("Suggests a random color with its hex code."),
    async execute(interaction) {
        const color = getRandomColor();
        await interaction.reply(`🎨 **Random Color:** ${color}`);
    }
};
