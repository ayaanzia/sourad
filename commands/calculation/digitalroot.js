/*const { SlashCommandBuilder } = require("discord.js");

async function digitalRoot(num) {
  while (toString(num).length() > 1) {
    numList = toString(num).split('')
    sum = 0
    numList.forEach( x => {
      sum += parseInt(x);   
    })
  }
}

module.exports {
  data: new SlashCommandBuilder()
    .setName('digitalroot')
    .setDescription('Calculates the digital root of a number')
    .addIntegerOption(option =>
      option.setName('input')
        .setDescription('The number to calculate the digital root of')
        .setRequired(true)),
  
  async execute(interaction) {
    const input = interaction.options.getInteger('input');
    let sum = 0;
    while (input > 0) {
      sum += input % 10;
    }
  }
}*/