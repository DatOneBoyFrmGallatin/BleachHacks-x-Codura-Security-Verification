const { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify yourself'),

    async execute(interaction) {
        // Must be used in the correct channel
        if (interaction.channelId !== config.verifyChannelId) {
            return interaction.reply({
                content: 'Use this in the verify channel.',
                ephemeral: true
            });
        }

        // Load the banner
        const banner = new AttachmentBuilder('./assets/verify-banner.jpeg');

        // Send message with the banner
        await interaction.reply({
            files: [banner],
            content: 'Verification successful!'
        });

        // Give the member role
        const role = interaction.guild.roles.cache.get(config.memberRoleId);
        if (!role) return interaction.followUp({ content: 'Role not found.', ephemeral: true });

        await interaction.member.roles.add(role);
    }
};
