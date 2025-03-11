const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("love")
        .setDescription("Expresses love"),
    async execute(interaction) {
        const responses = [
            "💖 If beauty had a name, it would be Melina. 💖",
            "❤️ Meli, you're the reason hearts beat faster and the stars shine brighter. ✨",
            "💕 Every moment with Melina is a moment worth treasuring. 💞",
            "😍 Melina, you are the definition of perfection. 😘",
            "💘 My world is brighter just because of you, Meli. 🌍❤️",
            "💓 If love had a queen, her name would be Melina. 👑",
            "💌 Meli, your smile is my favorite view in the universe. 🌌",
            "💞 No poem, no song, no words can ever describe how special Melina is. 🥰",
            "💗 Melina, you are not just loved—you are adored beyond words! 😍",
            "🔥 Meli, my love for you is like an eternal flame that never fades. 🔥"
        ];
        const reply = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(reply);
    }
};
