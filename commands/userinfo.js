const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Displays detailed user information"),
    async execute(interaction) {
        const user = interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        // Timestamps for account creation and server join
        const createdTimestamp = Math.floor(user.createdTimestamp / 1000);
        const joinedTimestamp = member ? Math.floor(member.joinedTimestamp / 1000) : "N/A";

        // Embed message
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setDescription(`
            **User Infos**  

            **Pseudonym**: ${user.tag} (<@${user.id}>)  
            **Identifier**: ${user.id}  
            **Account created on**: <t:${createdTimestamp}:R>  

            **Member Info**  

            **Joined the server on**: ${joinedTimestamp !== "N/A" ? `<t:${joinedTimestamp}:R>` : "Not in server"}  
            `)
            .setFooter({ text: "FlaviBot.xyz v5.0.28 | /help", iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
