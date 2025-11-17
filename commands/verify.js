
const { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config');

module.exports = {
  data: new SlashCommandBuilder().setName('verify').setDescription('Verify yourself'),
  async execute(interaction) {
    if (interaction.channelId !== config.verifyChannelId)
      return interaction.reply({content:'Use this in the verify channel.', ephemeral:true});

    const banner = new AttachmentBuilder('./assets/verify-banner.jpeg');
    await interaction.reply({files:[banner], content:'You are now verified!'});
    const role = interaction.guild.roles.cache.get(config.memberRoleId);
    await interaction.member.roles.add(role);
  }
};
