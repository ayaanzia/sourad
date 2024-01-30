const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('dumb 8ball answers dumb questions')
    .addStringOption(option =>
      option.setName('input')
          .setDescription('Your text goes here')),
    
  
  async execute(interaction) {
    function ball() {
      var responseList = [,'Yes.','No.','Maybe...','Probably.','Probably not.','Nay.','Aye.','idk','Doth as thy heart wishes.','I think so.','I do not think so.','Absolutely.','Absolutely not!'];
      return responseList[Math.floor(Math.random() * responseList.length)]
    }
    const ballEmbed = new EmbedBuilder()
      .setColor('00ff11')
      .setTitle(ball());
    
    await interaction.reply({embeds: [ballEmbed]})
  }}