require("dotenv").config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Load commands dynamically
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
console.log(`✅ Loaded commands: ${client.commands.map(cmd => cmd.data.name).join(", ")}`);

// Load allowed channels from file
const allowedChannelsFile = "./allowedChannels.json";
let allowedChannels = fs.existsSync(allowedChannelsFile) ? JSON.parse(fs.readFileSync(allowedChannelsFile, "utf-8")) : [];

const saveAllowedChannels = () => {
    fs.writeFileSync(allowedChannelsFile, JSON.stringify(allowedChannels, null, 2));
};

const MEMORY_LIMIT = 5; // Number of past messages to remember per channel
const channelMemory = new Map(); // Store short-term memory for each channel

// Bot Ready Event
client.once("ready", async () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);

    // Save all guilds to a file
    const guilds = client.guilds.cache.map(guild => ({
        id: guild.id,
        name: guild.name
    }));
    fs.writeFileSync("guilds.json", JSON.stringify(guilds, null, 2));
    
    // Register Global Commands (available in all servers)
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
    try {
        console.log("⏳ Registering global slash commands...");
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: client.commands.map(cmd => cmd.data.toJSON())
        });
        console.log("✅ Global slash commands registered!");
    } catch (error) {
        console.error("❌ Failed to register global commands:", error);
    }
});

// Handling Slash Commands
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        await interaction.reply({ content: "❌ Command not found!", ephemeral: true });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`❌ Error executing /${interaction.commandName}:`, error);
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: "There was an error executing this command!" });
        } else {
            await interaction.reply({ content: "There was an error executing this command!", ephemeral: true });
        }
    }
});

// Handling AI Mentions with Short-Term Memory
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // Reload the allowed channels list on each message
    let allowedChannels = [];
    if (fs.existsSync(allowedChannelsFile)) {
        allowedChannels = JSON.parse(fs.readFileSync(allowedChannelsFile, "utf-8"));
    }

    // Verify if the channel is in the allowed list
    if (!allowedChannels.includes(message.channel.id) && !message.mentions.has(client.user)) {
        return;
    }

    console.log(`📩 Message detected in allowed channel: ${message.channel.id}`);

    // Store the message in channel memory
    if (!channelMemory.has(message.channel.id)) {
        channelMemory.set(message.channel.id, []);
    }
    
    const messages = channelMemory.get(message.channel.id);
    messages.push({ role: "user", content: message.content });

    if (messages.length > MEMORY_LIMIT) {
        messages.shift();
    }

    await message.channel.sendTyping();

    try {
        const aiMessages = [
            { role: "system", content: process.env.SYSTEM_MESSAGE },
            ...messages
        ];

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen/qwen2.5-vl-72b-instruct:free",
                messages: aiMessages
            })
        });

        const data = await response.json();
        const replyMessage = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

        messages.push({ role: "assistant", content: replyMessage });
        if (messages.length > MEMORY_LIMIT) {
            messages.shift();
        }

        await message.reply(replyMessage);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        await message.reply("❌ Failed to get a response from the AI.");
    }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log("🚀 Bot login successful!");
}).catch(err => {
    console.error("❌ Failed to log in:", err);
});
