// Example of how to make a SlashCommand

module.exports = {
    name: "ping",
    category: "Utility",
    description: "Check the bot's ping!",
    ownerOnly: false,
    run: async (client, interaction) => {
        const msg = await interaction.channel.send(`🏓 Pinging...`);

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: Bot Ping')
            //.addField("Time", `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, true)
            .addFields({ name: 'Time', value: `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, inline: true })
            //.addField("API Ping", `${client.ws.ping}ms`, true)
            .addFields({ name: 'API Ping', value: `${client.ws.ping}ms`, inline: true })
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        await interaction.reply({ embeds: [pingEmbed] });

        msg.delete();
    },
};
