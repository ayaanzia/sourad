const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const fetch = require('node-fetch');
const he = require('he');

async function fetchJoke() {
  try {  
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
    const data = response.json()
    return(data)  
  } catch(e) {console.error("Error fetching joke for /joke:", e)}
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Sourad sends a random, occasionally funny, joke.'),
  async execute(interaction) {
    joke = await fetchJoke()
    title = ' '
    desc = ' '
    if (joke.type === "twopart") {
      title = he.decode(joke.setup)
      desc = he.decode(joke.delivery)
      } else {
        title = he.decode(joke.joke)
      }
    console.log(`Joke: ${title}\n${desc}`)
    const jokeEmbed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(desc)
      
/*  const button = new ButtonBuilder()
    .setCustomId('joke')
    .setLabel('Next Joke')
    .setStyle(ButtonStyle.Primary)
  
  const row = new ActionRowBuilder()
    .addComponents(button)
  */
    try{
      interaction.reply({embeds: [jokeEmbed]})
    } catch(e) {console.error(e)}
  }
}