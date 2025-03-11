const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

const allowedChannelsFile = "./allowedChannels.json";

// Function to safely load allowed channels
const loadAllowedChannels = () => {
    try {
        if (fs.existsSync(allowedChannelsFile)) {
            return JSON.parse(fs.readFileSync(allowedChannelsFile, "utf-8"));
        }
    } catch (error) {
        console.error("❌ Error reading allowedChannels.json:", error);
    }
    return []; // Default to an empty array if the file is missing or corrupt
};

// Function to safely save allowed channels
const saveAllowedChannels = (channels) => {
    try {
        fs.writeFileSync(allowedChannelsFile, JSON.stringify(channels, null, 2));
    } catch (error) {
        console.error("❌ Error writing to allowedChannels.json:", error);
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("assignchannel")
        .setDescription("Assigns the current channel for bot usage")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channelId = interaction.channel.id;
        let allowedChannels = loadAllowedChannels(); // Always load fresh data

        if (!allowedChannels.includes(channelId)) {
            allowedChannels.push(channelId);
            saveAllowedChannels(allowedChannels);
            await interaction.reply(`✅ This channel has been assigned for bot usage.`);
        } else {
            await interaction.reply(`⚠️ This channel is already assigned.`);
        }
    }
};
