const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Shows a list of Sourad's commands."),
  async execute(interaction) {
    const commandList = [
      {
        name: '/help',
        value: 'Shows a list of Sourad\'s commands.'
      },
      {
        name: '/8ball',
        value: 'Ask the magic 8-ball a question.'
      },
      {
        name: '/panda',
        value: 'Sends a random panda image.'
      },
      {
        name: '/pokemonstats',
        value: 'Displays stats of a specific Pokémon.'
      },
      {
        name: '/trivia',
        value: 'Start a trivia game.'
      },
      {
        name: '/rockpaperscissors',
        value: 'Play a game of rock-paper-scissors against Sourad!'
      },
      {
        name: '/joke',
        value: 'Sourad sends a random (occasionally funny) joke.'
      }
    ];
    
    const helpEmbed = new EmbedBuilder()
      .setTitle('Commands List')
      .setDescription('Here are the available commands:')
      .addFields(commandList);
  
      await interaction.reply({ embeds: [helpEmbed] });
    },
};