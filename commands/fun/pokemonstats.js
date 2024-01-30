const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokemonstats')
    .setDescription('Get stats of a Pokemon')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('Enter the name of the Pokemon')
        .setRequired(true)
    ),

  async execute(interaction) {
    const pokemonName = interaction.options.getString('name').toLowerCase();

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();

      const stats = data.stats.map(stat => {
        return `${stat.stat.name}: ${stat.base_stat}`;
      }).join('\n');
      const types = data.types.map((typeData) => typeData.type.name);

      const blankEmbed = new EmbedBuilder()
        .setColor(0x000000)
        .setTitle('      ');
      
      const embed1 = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Stats of ${data.name}`)
        .setThumbnail(data.sprites.front_default)
        .setDescription(`**Type(s)**\n ${types.join(', ')} \n **Abilities** \n${data.abilities.map(ability => ability.ability.name).join(', ')}\n\n**Base stats**\n${stats}`)
        .setFooter({text: 'Page 1 of 3'});

      // Fetch species and evo chain data
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
    
      const embed2 = new EmbedBuilder()
        .setColor(0x00ff00)
        .setThumbnail(data.sprites.front_shiny)
        .setTitle(`${data.name} - Additional Details`)
        .setFields({name:'Height', value: `${data.height*10} cm`, inline: true},
                   {name:'Weight', value: `${data.weight/10} kg`, inline: true},
                   {name:'Shape', value: speciesData.shape.name, inline: true},
                   {name:'Habitat', value: speciesData.habitat ? speciesData.habitat.name : 'Unknown', inline: true })
        .setFooter({text: 'Page 2 of 3'});
      
      const movesData = data.moves.slice(0, 10); // Only display the first 10 moves

      const moveDetails = await Promise.all(movesData.map(async (moveData) => {
        const moveResponse = await fetch(moveData.move.url);
        const moveDetailsData = await moveResponse.json();
        const levelLearned = moveData.version_group_details.find((detail) => detail.move_learn_method.name === 'level-up');
        return `**${moveData.move.name}** - ${levelLearned ? `Learned at level ${levelLearned.level_learned_at}` : 'Other conditions'}`;
      }));

      const embed3 = new EmbedBuilder()
        .setColor(0xff0000)
        .setThumbnail(data.sprites.other.home.front_default)
        .setTitle(`${data.name} - Moves`)
        .setDescription(moveDetails.join('\n'))
        .setFooter({text: 'Page 3 of 3'});

      const button1 = new ButtonBuilder()
        .setCustomId('1')
        .setLabel('1')
        .setStyle(ButtonStyle.Primary)
      const button2 = new ButtonBuilder()
        .setCustomId('2')
        .setLabel('2')
        .setStyle(ButtonStyle.Primary)
      const button3 = new ButtonBuilder()
        .setCustomId('3')
        .setLabel('3')
        .setStyle(ButtonStyle.Primary)

      buttonSelect = new ActionRowBuilder()
        .addComponents(button1,button2,button3)
      
      const buttonPressed = await interaction.reply({ embeds: [embed1], components: [buttonSelect] });
      const collectorFilter = i => i.user.id === interaction.user.id;
      try{
        const embedOption = await buttonPressed.awaitMessageComponent({filter: collectorFilter, time: 60000});
        let currentEmbed = null;
        //console.log(embedOption.customId)
        switch(embedOption.customId){
          case '1': //interaction.editReply({embeds:[blankEmbed]})
            currentEmbed = embed1;
            buttonSelect = new ActionRowBuilder()
            .addComponents(button1,button2,button3)

            interaction.editReply({ embeds: [currentEmbed], components: [buttonSelect] })
            break;
          case '2': 
            currentEmbed = embed2;
            buttonSelect = new ActionRowBuilder()
            .addComponents(button1,button2,button3)
            interaction.editReply({ embeds: [currentEmbed], components: [buttonSelect] })
            break;
          case '3':
            buttonSelect = new ActionRowBuilder()
            .addComponents(button1,button2,button3)
            currentEmbed = embed3;
            interaction.editReply({ embeds: [currentEmbed], components: [buttonSelect] })
            break;
        }
      //interaction.editReply({ embeds: [currentEmbed], components: [buttonSelect] })
      } catch(e) {console.log("pokemon stats error (maybe): ", e)}
      }
      
      
    catch (error) {
      console.error('Error fetching Pokemon data:', error);
      await interaction.reply('Could not find information for that Pokemon.');
    }
  },
};
