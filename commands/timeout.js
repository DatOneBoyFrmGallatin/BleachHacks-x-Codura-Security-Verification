const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user for a number of minutes')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to timeout')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('How long to timeout the user (in minutes)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const minutes = interaction.options.getInteger('minutes');

        if (minutes < 1) {
            return interaction.reply({ content: '❌ Minutes must be **1 or higher**.', ephemeral: true });
        }

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);
        if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
        }

        const durationMs = minutes * 60 * 1000;

        await member.timeout(durationMs).catch(() => null);

        await interaction.reply(`⏳ **${user.tag}** has been timed out for **${minutes} minutes**.`);
    },
};
