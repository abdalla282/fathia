const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Deletes a number of messages")
        .addIntegerOption(option =>
            option.setName("amount")
                .setDescription("Number of messages to delete")
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const amount = interaction.options.getInteger("amount");
        const channel = interaction.channel;

        if (amount < 1 || amount > 100) {
            await interaction.editReply("❌ Amount must be between 1 and 100.");
            return;
        }

        try {
            const messages = await channel.bulkDelete(amount, true);
            await interaction.editReply(`🗑️ Deleted ${messages.size} messages.`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("❌ Failed to delete messages.");
        }
    }
};
