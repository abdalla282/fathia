const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wouldyourather")
        .setDescription("Asks a random 'Would You Rather' question"),
    async execute(interaction) {
        const questions = [
            "Would you rather be able to fly or be invisible? ✈️🫥",
            "Would you rather have unlimited money or unlimited happiness? 💰😊",
            "Would you rather live in space or under the sea? 🚀🌊",
            "Would you rather never be able to lie or never be able to speak again? 🤐",
            "Would you rather time travel to the past or the future? ⏳",
            "Would you rather have super strength or super speed? 💪⚡",
            "Would you rather live in a world with no music or no movies? 🎶🎬",
            "Would you rather always be 10 minutes late or always 30 minutes early? ⏰",
            "Would you rather be able to read minds or see the future? 🧠🔮",
            "Would you rather eat only your favorite food forever or never eat it again? 🍕❌",
            "Would you rather be famous for something embarrassing or completely unknown? 📸",
            "Would you rather have a rewind button or a pause button for your life? ⏪⏸️",
            "Would you rather have infinite knowledge or infinite creativity? 📚🎨",
            "Would you rather be a genius everyone hates or an average person everyone loves? 🧠❤️",
            "Would you rather always have to sing instead of talking or dance instead of walking? 🎤💃",
            "Would you rather have to eat spicy food forever or never eat sweets again? 🌶️🍭",
            "Would you rather have a pet dragon or a pet unicorn? 🐉🦄",
            "Would you rather never feel pain or never feel fear? 😌😨",
            "Would you rather live 100 years in the past or 100 years in the future? ⏳",
            "Would you rather have a life full of adventure or a life full of comfort? 🏕️🏠"
        ];
        const question = questions[Math.floor(Math.random() * questions.length)];
        await interaction.reply(question);
    }
};
