// rockpaperscissors.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rockpaperscissors')
    .setDescription('Play Rock-Paper-Scissors against Sourad!')
    .addStringOption(option =>
      option
        .setName('choice')
        .setDescription('Rock, paper or scissors?')
        .setRequired(true)
        ),
  async execute(interaction) {
    const choices = ['rock', 'paper', 'scissors'];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    const userChoice = interaction.options.getString('choice').toLowerCase();
    if (!choices.includes(userChoice)) {
      return interaction.reply('Please choose either rock, paper, or scissors!');
    }

    let result;
    if (botChoice === userChoice) {
      result = 'It\'s a tie!';
    } else if (
      (userChoice === 'rock' && botChoice === 'scissors') ||
      (userChoice === 'scissors' && botChoice === 'paper') ||
      (userChoice === 'paper' && botChoice === 'rock')
    ) {
      result = 'You win!';
    } else {
      result = 'I win!';
    }

    interaction.reply(`I choose ${botChoice}. ${result}`);
  },
};
