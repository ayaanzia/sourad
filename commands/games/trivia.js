const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const fetch = require('node-fetch');
const he = require('he');

  //fetching trivia Qs
async function fetchTriviaQuestions(amount, category, difficulty, type) {
  try {
//    const category = Math.floor(Math.random()*)
    const url = `https://opentdb.com/api.php?amount=1&type=${type}`;
    //const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0]; 
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    return null; 
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Sends a trivia question'),
    //.addStringOption(option =>
      //option.setName('difficulty')
        //  .setDescription('Choose easy, medium, or hard')),
  async execute(interaction) {
    const amount = 1; 
    const category = 9; 
    const difficulty = 'medium';
    const type = 'multiple'; 

    const question = await fetchTriviaQuestions(amount, category, difficulty, type) 
      const titleVal = question.question
      const triviaOptions = question.incorrect_answers.concat(question.correct_answer).sort()
      const correctAns = question.correct_answer
      console.log(titleVal, triviaOptions, correctAns)
    const Cat = question.category
    const Dif = question.difficulty
    const emptyString = ''
    const footer = emptyString.concat("Category: ", Cat.toLowerCase(), "     •     Difficulty: ", Dif)
    const alphabets = ["A", "B", "C", "D"]
    const triviaEmbed = new EmbedBuilder()
      .setTitle(he.decode(titleVal))
      .setFields({ name: "A", value: he.decode(triviaOptions[0]), inline: true },
                 { name: "B", value: he.decode(triviaOptions[1]), inline: true },
                 { name: "   ", value: " "},
                 { name: "C", value: he.decode(triviaOptions[2]), inline: true },
                 { name: "D", value: he.decode(triviaOptions[3]), inline: true })
      .setFooter({text: footer})

    const buttonA = new ButtonBuilder()
      .setCustomId('buttonA')
      .setLabel('A')
      .setStyle(ButtonStyle.Primary)
    const buttonB = new ButtonBuilder()
      .setCustomId('buttonB')
      .setLabel('B')
      .setStyle(ButtonStyle.Primary)
    const buttonC = new ButtonBuilder()
      .setCustomId('buttonC')
      .setLabel('C')
      .setStyle(ButtonStyle.Primary) 
    const buttonD = new ButtonBuilder()
      .setCustomId('buttonD')
      .setLabel('D')
      .setStyle(ButtonStyle.Primary)
      

    const choiceRow = new ActionRowBuilder()
      .addComponents(buttonA, buttonB, buttonC, buttonD);
    
    const userAns = await interaction.reply({
      embeds: [triviaEmbed],
      components: [choiceRow],
    });
    const collectorFilter = i => {
      if (i.user.id === interaction.user.id) {
        i.deferUpdate();
        return true
      }
    }
    
    try {
      const confirmAns = await userAns.awaitMessageComponent({filter: collectorFilter, time: 120000});
      if (confirmAns.customId === "button".concat(alphabets[triviaOptions.indexOf(correctAns)])) {
        await interaction.followUp(`<@${interaction.user.id}> Correct! The answer is ${correctAns}.`)
        
      } else {await interaction.followUp(`<@${interaction.user.id}> Wrong! the correct answer is ${correctAns}.`)}}
    catch(e) {console.error("ERROR while verifying to recieving answer:  ", e)}
}}