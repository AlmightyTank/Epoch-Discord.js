//Constants for Twitch API Grabber
const { GuildMemberManager } = require('discord.js');
const fetch = require('node-fetch');
const twitchIDEndpoint = 'https://id.twitch.tv/oauth2/token';
const twitchAPIEndpoint = 'https://api.twitch.tv';
const streamers = [
    {
      name: 'streamer1',
      twitch_username: 'bakedbackhouse',
      live: false,
    },
    {
      name: 'streamer2',
      twitch_username: 'toastracktv',
      live: false,
    },
    {
      name: 'streamer3',
      twitch_username: 'almightytank',
      live: false,
    },
    {
      name: 'streamer4',
      twitch_username: 'verybadscav',
      live: false,
    },
    {
      name: 'streamer5',
      twitch_username: 'duskyreaper07',
      live: false,
    },
    {
      name: 'streamer6',
      twitch_username: 'airwingmarine',
      live: false,
    },
    {
      name: 'streamer7',
      twitch_username: 'jessekazam',
      live: false,
    },
  ];
  
  let twitchAPIToken = '';

// Call .env file to get Token
require('dotenv').config();

module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */

    async execute(client) {
        
        // Puts an activity
        //client.user.setActivity("AlMightyTank#6286", {
        //    type: "WATCHING",
        //    name: "AlMightyTank#6286"
        //});
        
        // Send a message on the console
        console.log(`[LOG] ${client.user.tag} is now online!`);
        console.log(`[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers`);
        console.log(`[LOG] Bot serving ${client.users.cache.size} users`);

        function getTwitchAPIToken() {
            const url = twitchIDEndpoint;
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials'
              })
            };
            fetch(url, options)
              .then(response => response.json())
              .then(data => {
                twitchAPIToken = data.access_token;
                console.log(`[LOG] Got Twitch API token: ${twitchAPIToken}`);
              })
              .catch(error => {
                console.error(`[ERROR] Error getting Twitch API token: ${error}`);
              });
        }

        // List of Activity that are picked at random when no one is live
        //Playing = 0, Streaming = 1, Listening to = 2, Watching = 3, Competing = 5
        const list = [
          { name: 'AlMightyTank#6286', number: 3 },
          { name: 'Myself get Lost', number: 3 },
          { name: 'Word of Wisdom', number: 2 },
          { name: 'with Tornados', number: 0 },
          { name: 'the Screams from Below', number: 2 },
          { name: 'the Fight for Life in Tarkov', number: 5 },
        ];

        // Define an array to store the previous picks
        const previousPicks = [];

        // Define a function that picks a random element from the list, along with its number, without repeating previous picks
        function pickRandomFromList(list, previousPicks) {
          let randomElement = null;
          while (!randomElement || previousPicks.includes(randomElement.name)) {
            const randomIndex = Math.floor(Math.random() * list.length);
            randomElement = list[randomIndex];
          }
          return { name: randomElement.name, number: randomElement.number };
        }
        
        // Define a function that picks a random element from the list, along with its number
        //function pickRandomFromList(list) {
        //  const randomIndex = Math.floor(Math.random() * list.length);
        //  const randomElement = list[randomIndex];
        //  return { name: randomElement.name, number: randomElement.number };
        //}
         
        function updateStatus(streamers) {
            const url = `${twitchAPIEndpoint}/helix/streams?user_login=${streamers}`;
            const options = {
              method: 'GET',
              headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${twitchAPIToken}`
              },
            };
            fetch(url, options)
              .then(response => {
                if (response.status === 401) {
                  console.log('[401] Twitch API token expired, refreshing...');
                  return getTwitchAPIToken().then(() => updateStatus(streamers));
                } else {
                  return response.json();
                }
              })
              .then(data => {
                const isLive = data.data.length > 0;
                if (isLive) {
                    const streamData = data.data[0];
                    const streamTitle = streamData.title;
                    const streamGame = streamData.game_name;
                    const streamerName = streamData.user_name;
                    const streamURL = `https://www.twitch.tv/${streamers}`;
                    //client.user.setActivity(`${streamers} is live!`, { type: "STREAMING", url: streamURL });
                    client.user.setActivity(`${streamerName} playing ${streamGame}!`, {
                        type: "STREAMING",
                        url: streamURL
                    });
                    client.user.setStatus("online");
                    console.log(`[LOG] ${streamers} is live`)
                } else {
                    //const randomElement = pickRandomFromList(list);
                    const randomElement = pickRandomFromList(list, previousPicks);
                    previousPicks.push(randomElement.name);
                    client.user.setActivity(`${randomElement.name}`, { type: randomElement.number});
                    client.user.setStatus("online");
                    console.log(`[LOG] ${streamers} is not live and picked ${randomElement.name} and ${previousPicks.length}`);
                    if(previousPicks.length > 4) {
                      previousPicks.length = 0;
                      console.log(`[LOG] Previous Picks CLEARED - ${previousPicks.length}`);
                    }
                }
              })
              .catch(error => {
                console.error(error);
              });
        }

        getTwitchAPIToken();
         
        setInterval(() => {
            streamers.forEach((streamers, i) => {
                setTimeout(() => {
                    //console.log(`[LOG] ${streamers.twitch_username}`);
                    updateStatus(streamers.twitch_username);
                }, 60000 * i);
            });
        }, 60000 * (streamers.length + 1)); 
    }
}
