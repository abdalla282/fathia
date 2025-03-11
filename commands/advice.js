const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("advice")
        .setDescription("Gives a random life advice"),
    async execute(interaction) {
        const adviceList = [
            "💡 Believe in yourself and all that you are.",
            "💡 The only limit to our realization of tomorrow is our doubts of today.",
            "💡 Never stop learning, because life never stops teaching.",
            "💡 Hardships often prepare ordinary people for an extraordinary destiny.",
            "💡 Focus on progress, not perfection.",
            "💡 Success doesn’t come from what you do occasionally, but from what you do consistently.",
            "💡 Mistakes are proof that you are trying. Keep going!",
            "💡 You don’t have to be great to start, but you have to start to be great.",
            "💡 A smooth sea never made a skilled sailor. Embrace challenges!",
            "💡 Don’t compare your Chapter 1 to someone else’s Chapter 20.",
            "💡 Your time is limited, so don’t waste it living someone else’s life.",
            "💡 The secret of getting ahead is getting started.",
            "💡 Surround yourself with positive people and energy.",
            "💡 Take a break, rest, and come back stronger.",
            "💡 Keep your circle full of those who inspire you.",
            "💡 A negative mind will never give you a positive life.",
            "💡 Start where you are, use what you have, do what you can.",
            "💡 Make peace with your past so it doesn’t ruin your future.",
            "💡 Never stop believing in the power of your dreams."
        ];
        const advice = adviceList[Math.floor(Math.random() * adviceList.length)];
        await interaction.reply(advice);
    }
};
