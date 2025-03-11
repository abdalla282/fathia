const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays a list of available commands and their usage."),
    async execute(interaction) {
        const commands = interaction.client.commands;
        const embeds = [];

        // تقسيم الأوامر إلى مجموعات من 25 أمرًا كحد أقصى لكل Embed
        const commandChunks = Array.from(commands.values()).reduce((acc, command, index) => {
            const chunkIndex = Math.floor(index / 25);
            if (!acc[chunkIndex]) acc[chunkIndex] = [];
            acc[chunkIndex].push(command);
            return acc;
        }, []);

        // إنشاء Embed لكل مجموعة من 25 أمرًا
        commandChunks.forEach((chunk, index) => {
            const embed = new EmbedBuilder()
                .setTitle(index === 0 ? "✨ Command List" : `✨ Command List (Part ${index + 1})`)
                .setDescription("Here are all the available commands you can use:")
                .setColor("#5865F2")
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: "Use /help [command] for more details!", iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            chunk.forEach(command => {
                embed.addFields({ 
                    name: `🔹 \`/${command.data.name}\``, 
                    value: `➥ ${command.data.description}`, 
                    inline: false 
                });
            });

            embeds.push(embed);
        });

        // إرسال جميع الـ Embeds دفعة واحدة
        await interaction.reply({ embeds });
    }
};
