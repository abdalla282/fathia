const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Displays detailed server information"),
    async execute(interaction) {
        const { guild } = interaction;

        // Fetching owner and roles
        const owner = await guild.fetchOwner();
        const roles = guild.roles.cache.map(role => role.toString()).join(", ") || "No roles";
        const roleCount = guild.roles.cache.size;

        // Channel counts
        const textChannels = guild.channels.cache.filter(c => c.type === 0).size; // Text channels
        const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size; // Voice channels
        const totalChannels = textChannels + voiceChannels;

        // Security level mapping
        const securityLevels = ["None", "Low", "Medium", "High", "Maximum"];
        const securityLevel = securityLevels[guild.verificationLevel];

        // Creation date formatted
        const createdTimestamp = Math.floor(guild.createdTimestamp / 1000);

        // Embed message
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle(`📌 ${guild.name} - Server Info`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
            .setDescription(`
            **Owner**: ${owner.user.tag} (<@${owner.id}>)
            **Server Name**: ${guild.name}
            **Member Count**: ${guild.memberCount}
            **Number of Channels**: ${totalChannels}
            **Security Level**: ${securityLevel}
            **Identifiant**: ${guild.id}
            **Creation Date**: <t:${createdTimestamp}:R>
            **Roles [${roleCount}]**: ${roles}
            `)
            .setFooter({ text: "FlaviBot.xyz v5.0.28 | /help", iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
