const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

const allowedChannelsFile = "./allowedChannels.json";

// Load and Save functions (same as above)
const loadAllowedChannels = () => {
    try {
        if (fs.existsSync(allowedChannelsFile)) {
            return JSON.parse(fs.readFileSync(allowedChannelsFile, "utf-8"));
        }
    } catch (error) {
        console.error("❌ Error reading allowedChannels.json:", error);
    }
    return [];
};

const saveAllowedChannels = (channels) => {
    try {
        fs.writeFileSync(allowedChannelsFile, JSON.stringify(channels, null, 2));
    } catch (error) {
        console.error("❌ Error writing to allowedChannels.json:", error);
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removechannel")
        .setDescription("Removes the current channel from bot usage")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channelId = interaction.channel.id;
        let allowedChannels = loadAllowedChannels(); // Reload data

        if (allowedChannels.includes(channelId)) {
            allowedChannels = allowedChannels.filter(id => id !== channelId);
            saveAllowedChannels(allowedChannels);
            await interaction.reply(`✅ This channel has been removed from the allowed list.`);
        } else {
            await interaction.reply(`⚠️ This channel is not assigned.`);
        }
    }
};
