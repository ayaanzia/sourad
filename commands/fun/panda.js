const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('panda')
    .setDescription('Sends a random emote of Panda from Jujutsu Kaisen'),
  
  async execute(interaction) {
    function pandaSelect(){
      var pandagif= ['<a:bbpanda:806755799136731146>', '<a:panda:806004460056215552>', '<a:panda_brr:806739369129672744>', `<a:panda_reverse:806015977530851349>`, `<a:panda10:806769406301831179>`, `<a:pandaconfoos:806737585429807114>`, `<a:panda9:806769407606128640>`, `<a:panda8:806769406914723841>`, `<a:panda7:806769407052480522>`, `<a:panda6:806769406985109554>`, `<a:panda5:806769407283429396>`, `<a:panda13:806769408604766248>`, `<a:panda12:806769408256114689>`, '<a:panda11:806769408533594132>'];
      var pandaVal = pandagif[Math.floor(Math.random()*pandagif.length)];
      console.log(pandaVal)
      return pandaVal
            }
    await interaction.reply(pandaSelect())
  }
}