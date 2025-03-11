const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("motivate")
        .setDescription("Sends a motivational quote"),
    async execute(interaction) {
        const quotes = [
            "🔥 Push yourself, because no one else is going to do it for you.",
            "🔥 Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "🔥 Wake up with determination, go to bed with satisfaction.",
            "🔥 Don’t wait for opportunity. Create it.",
            "🔥 The harder you work for something, the greater you'll feel when you achieve it.",
            "🔥 Every day may not be good, but there is something good in every day.",
            "🔥 The only way to do great work is to love what you do.",
            "🔥 Train your mind to see the good in every situation.",
            "🔥 If you want to fly, give up everything that weighs you down.",
            "🔥 The best way to predict your future is to create it.",
            "🔥 A little progress each day adds up to big results.",
            "🔥 Your potential is endless—go do what you were made for.",
            "🔥 Stay away from negative people, they have a problem for every solution.",
            "🔥 You don’t have to be perfect, you just have to be better than yesterday.",
            "🔥 Chase your dreams until they become your reality.",
            "🔥 If you're going through hell, keep going!",
            "🔥 You didn’t come this far to only come this far.",
            "🔥 Nothing is impossible. The word itself says 'I'm possible'!",
            "🔥 Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
            "🔥 Dream big, work hard, stay focused, and surround yourself with good people."
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        await interaction.reply(quote);
    }
};
