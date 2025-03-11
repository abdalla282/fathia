const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Gets the current weather for a city")
        .addStringOption(option =>
            option.setName("city")
                .setDescription("Enter the city name")
                .setRequired(true)
        ),
    async execute(interaction) {
        const city = interaction.options.getString("city");
        const apiKey = "988d7fc1f75ffc9b8af10cbee6f2f870";  // Replace with your API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            const weather = response.data;
            await interaction.reply(`🌤️ Weather in ${city}: ${weather.weather[0].description}, ${weather.main.temp}°C`);
        } catch (error) {
            await interaction.reply("❌ Could not fetch weather data. Check the city name.");
        }
    }
};
