const fs = require('fs');
const Discord = require('discord.js');
const { constants } = require('buffer');

const filePath = './src/data/maps.txt';

const maxMaps = 8;

let maps = [''];

const premaps = ['Maps '];

// Read the maps from the file
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
        
    // Split the data into an array of maps
    maps = data.trim().split('\n');
});

module.exports = {
    name: "whatmap",
    aliases: ["whatmap", "roulette"],
    usage: '/whatmap <add,rm,roulette,list>',
    category: "Utility",
    description: "To help select maps for indecisive people!",
    ownerOnly: false,
    options: [
        {
            name: "command",
            description: "What command do you want to run",
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            required: true
        },
        {
            name: "map",
            description: "Maps of Tarkov",
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            required: false
        }
    ],

    run: async (client, interaction) => {

        const commandInt = interaction.options.getString("command");
        const mapIntUpper = interaction.options.getString("map");

        if (!commandInt==null || !commandInt=="") {

            if(commandInt === 'removemap' || commandInt === 'rm') {
                const mapInt = mapIntUpper.toLowerCase();
                const mapToRemove = mapInt;

                const index = maps.indexOf(mapToRemove);
                if (!index === -1) {
                    return interaction.reply({content : `Map ${mapToRemove} not found`, ephemeral: true });
                }

                console.log(mapToRemove)
                // Remove the map from the array
                maps.splice(index, 1);

                const mapSG = maps.toString();
                console.log(mapSG)
                const mapsNS = mapSG.replace(/\s+/g, ' ').trim()

                const mapsWB0 = mapsNS.split(',').slice(0, 1);
                const mapsWB1 = mapsNS.split(',').slice(1, 2);
                const mapsWB2 = mapsNS.split(',').slice(2, 3);
                const mapsWB3 = mapsNS.split(',').slice(3, 4);
                const mapsWB4 = mapsNS.split(',').slice(4, 5);
                const mapsWB5 = mapsNS.split(',').slice(5, 6);
                const mapsWB6 = mapsNS.split(',').slice(6, 7);
                const mapsWB7 = mapsNS.split(',').slice(7, 8);

                fs.writeFile(filePath, mapsWB0 + ('\n') + mapsWB1 + ('\n') + mapsWB2 + ('\n') + mapsWB3 + ('\n') + mapsWB4 + ('\n') + mapsWB5 + ('\n') + mapsWB6 + ('\n') + mapsWB7 + ('\n'), (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    } 
                    interaction.reply({content : `Removed ${mapToRemove} from the map list`, ephemeral: true });
                });
            } else if (commandInt === 'addmap' || commandInt === 'am'|| commandInt === 'ad' || commandInt === 'add') {
                const mapInt = mapIntUpper.toLowerCase();
                if (maps.length >= maxMaps) {
                    return interaction.reply(`Can only have ${maxMaps} maps stored at a time`);
                } else if (!mapInt==null || !mapInt==""){
                    const isMatch = maps.includes(mapInt);
                    const mapsToAdd0 = mapInt.split(' ').slice(0, 1);
                    const mapsToAdd1 = mapInt.split(' ').slice(1, 2);
                    const mapsToAdd2 = mapInt.split(' ').slice(2, 3);
                    const mapsToAdd3 = mapInt.split(' ').slice(3, 4);
                    const mapsToAdd4 = mapInt.split(' ').slice(4, 5);
                    const mapsToAdd5 = mapInt.split(' ').slice(5, 6);
                    const mapsToAdd6 = mapInt.split(' ').slice(6, 7);
                    const mapsToAdd7 = mapInt.split(' ').slice(7, 8);

                    console.log(mapInt)

                    if(!isMatch) {
                        if (mapsToAdd0 == 'shoreline' || mapsToAdd0 == 'customs' || mapsToAdd0== 'reserve' || mapsToAdd0== 'lighthouse' || mapsToAdd0== 'streets' || mapsToAdd0== 'interchange' || mapsToAdd0=='woods' || mapsToAdd0=='factory') {
                            interaction.reply({content : `Adding ${mapInt} to the map list`, ephemeral: true });
    
                            console.log(mapsToAdd0)
                            maps.push(mapsToAdd0);
                            
                            fs.appendFile(filePath, mapsToAdd0 + '\n', (err, data) => {
                                if (err) {
                                    console.error(err);
                                return;
                                }
                            });
                            if (!mapsToAdd1.length == 0){
                                console.log(mapsToAdd1)
                                maps.push(mapsToAdd1);
                                fs.appendFile(filePath, mapsToAdd1 + '\n', (err, data) => {
                                    if (err) {
                                        console.error(err);
                                    return;
                                }
                            });
                                if (!mapsToAdd2.length == 0){
                                    console.log(mapsToAdd2)
                                    maps.push(mapsToAdd2);
                                    
                                    fs.appendFile(filePath, mapsToAdd2 + '\n', (err, data) => {
                                        if (err) {
                                            console.error(err);
                                        return;
                                    } 
                                });
                                    if (!mapsToAdd3.length == 0){
                                        console.log(mapsToAdd3)
                                        maps.push(mapsToAdd3);
                                        
                                        fs.appendFile(filePath, mapsToAdd3 + '\n', (err, data) => {
                                            if (err) {
                                                console.error(err);
                                            return;
                                        }  
                                    });
                                        if (!mapsToAdd4.length == 0){
                                            console.log(mapsToAdd4)
                                            maps.push(mapsToAdd4);
                                            
                                            fs.appendFile(filePath, mapsToAdd4 + '\n', (err, data) => {
                                                if (err) {
                                                    console.error(err);
                                                return;
                                            } 
                                            //interaction.reply(`Added ${mapsToAdd4} to the map list`);
                                        });
                                            if (!mapsToAdd5.length == 0){
                                                console.log(mapsToAdd5)
                                                maps.push(mapsToAdd5);
                                                
                                                fs.appendFile(filePath, mapsToAdd5 + '\n', (err, data) => {
                                                    if (err) {
                                                        console.error(err);
                                                    return;
                                                } 
                                                //interaction.reply(`Added ${mapsToAdd5} to the map list`);
                                            });
                                                if (!mapsToAdd6.length == 0){
                                                    console.log(mapsToAdd6)
                                                    maps.push(mapsToAdd6);
                                                    
                                                    fs.appendFile(filePath, mapsToAdd6 + '\n', (err, data) => {
                                                        if (err) {
                                                            console.error(err);
                                                        return;
                                                    } 
                                                    //interaction.reply(`Added ${mapsToAdd6} to the map list`);
                                                });
                                                    if (!mapsToAdd7.length == 0){
                                                        console.log(mapsToAdd7)
                                                        maps.push(mapsToAdd7);
                                                        
                                                        fs.appendFile(filePath, mapsToAdd7 + '\n', (err, data) => {
                                                            if (err) {
                                                                console.error(err);
                                                            return;
                                                        } 
                                                        //interaction.reply(`Added ${mapInt} to the map list`);
                                                    });
                                                    } 
                                                }
                                            }
                                        }
                                    }
                                }
                            }     
                        }
                    } else {
                        interaction.reply({content : `${mapInt} is already on the map list`, ephemeral: true });
                    }
                }              
            } else if (commandInt === 'roulette' || commandInt === 'r') {
                // Check if there are any maps stored
                if (maps.length === 0) {
                    return interaction.reply({content : `No maps found. Use the addmap command to add maps`, ephemeral: true });
                }
                // Select a random map from the array
                const selectedMap = maps[Math.floor(Math.random() * maps.length)];
                interaction.reply(`The selected map is: ${selectedMap}`);
            } else if (commandInt === 'maps' || commandInt === 'ms' || commandInt=== 'list') {
                // Check if there are any maps stored
                if (maps.length === 0) {
                    return interaction.reply({content : `No maps found. Use the addmap command to add maps`, ephemeral: true });
                }
                // Select a random map from the array
                interaction.reply({content : `The current maps are: \n${maps.join('\n')}`, ephemeral: true });
            }

            // This is what it commands when using the command without arguments
            //let whatmapCmdEmbed = new client.discord.MessageEmbed()
               // .setTitle(`${client.user.username} Time Converter`)
               // .addFields({ name: "Description", value: `The selected map is: ${selectedMap}` })
               // .setColor(client.config.embedColor)
               // .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

            //interaction.reply({ embeds: [whatmapCmdEmbed]});
        } else {
            const dateInt = client.slash.get(dateInt.toLowerCase());

            const message4 = "Please provide a command like addmap, removemap, roulette,";
            const message5 = "Please use !maproulette addmap Reserve, or !maproulette removemap Reserve";

                // This is what it sends when using the command with argument and if it finds the command
                let command = client.slash.get(dateInt.toLowerCase());
                let name = command.name;
                let description = command.description || message4
                let usage = command.usage || message5
                let category = command.category || "No category provided!"
    
                let whatmapCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Time Converter`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` })
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                    interaction.reply({ embeds: [whatmapCmdEmbed] });
            
        }
    },
};