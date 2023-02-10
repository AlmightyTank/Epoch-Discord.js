const moment = require('moment');
const momentTz = require('moment-timezone');
const Discord = require('discord.js');

module.exports = {
    name: "epoch",
    aliases: ["e", "convert"],
    usage: '/epoch <command>',
    category: "Utility",
    description: "Convert time to Epoch!",
    ownerOnly: false,
    options: [
        {
            name: "date",
            description: "The date in which you wish to convert",
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            required: true
        },
        {
            name: "time",
            description: "The time in which you wish to convert",
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            required: true
        },
        {
            name: "timezone",
            description: "Timezone your'e currently in",
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            required: true
        }
    ],

    run: async (client, interaction) => {

        //const commandInt = interaction.options.getString("command");
        const dateInt = interaction.options.getString("date");
        const timeInt = interaction.options.getString("time");
        const timezoneInt = interaction.options.getString("timezone");


        if (!dateInt==null || !dateInt=="") {

            parseInt(timeInt);
            parseInt(dateInt);

            const time = timeInt;
            const date = dateInt;
            const timezone = timezoneInt;

            console.log(timeInt, dateInt, timezoneInt)

            const formattedDate = momentTz.tz(`${date}, ${time}`, timezone);
            formattedDate.add(6, 'hours');
            
            const epoch = formattedDate.valueOf();
      
            const epochTimeString = epoch.toString();
            const first_ten = epochTimeString.substring(0, 10);
            console.log(first_ten);
            
            const message1 = "If you want it displayed like this <t:";
            const message2 = "> use `<t:";
            const message3 = ">`";


            // This is what it commands when using the command without arguments
            let epochCmdEmbed = new client.discord.MessageEmbed()
                .setTitle(`${client.user.username} Time Converter`)
                .addFields({ name: "Description", value: `${message1}${first_ten}${message2}${first_ten}${message3}` })
                .setColor(client.config.embedColor)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [epochCmdEmbed]});
        } else {
            const dateInt = client.slash.get(dateInt.toLowerCase());

            const message4 = "Please provide a time, date, and timezone to convert";
            const message5 = "Please use !epoch HH:MM YYYY/MM/DD TIMEZONE";

                // This is what it sends when using the command with argument and if it finds the command
                let command = client.slash.get(dateInt.toLowerCase());
                let name = command.name;
                let description = command.description || message4
                let usage = command.usage || message5
                let category = command.category || "No category provided!"
    
                let epochCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Time Converter`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` })
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                    interaction.reply({ embeds: [epochCmdEmbed] });
            
        }
    },
};
