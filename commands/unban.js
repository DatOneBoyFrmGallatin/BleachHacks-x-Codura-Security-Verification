const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user by their ID')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The ID of the user to unban')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('userid');

        try {
            await interaction.guild.members.unban(userId);
            interaction.reply(`♻️ Successfully unbanned user with ID: **${userId}**`);
        } catch (error) {
            interaction.reply({
                content: '❌ Could not unban. That ID may not be banned.',
                ephemeral: true
            });
        }
    }
};
