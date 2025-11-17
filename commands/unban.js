const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user by their ID')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('ID of the user to unban')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('userid');

        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply(`♻️ Successfully unbanned user with ID: **${userId}**`);
        } catch (error) {
            await interaction.reply({ content: '❌ Could not unban. User may not be banned or ID is invalid.', ephemeral: true });
        }
    },
};
