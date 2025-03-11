const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const ASSIGNED_CHANNELS_FILE = "./assignedChannels.json";

// Function to load assigned channels safely
function loadAssignedChannels() {
    try {
        if (fs.existsSync(ASSIGNED_CHANNELS_FILE)) {
            return JSON.parse(fs.readFileSync(ASSIGNED_CHANNELS_FILE, "utf8"));
        }
    } catch (error) {
        console.error("Error loading assigned channels:", error);
    }
    return {}; // Return empty object if the file is missing or corrupted
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("assignedchannels")
        .setDescription("Displays the channels where the bot can respond without mention"),
    
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const assignedChannels = loadAssignedChannels()[guildId] || [];

        if (!Array.isArray(assignedChannels) || assignedChannels.length === 0) {
            return interaction.reply("❌ No assigned channels found! Use `/assignchannel` to set one.");
        }

        const channelList = assignedChannels.map(channelId => `<#${channelId}>`).join("\n");

        await interaction.reply(`✅ **Assigned Channels:**\n${channelList}`);
    }
};
