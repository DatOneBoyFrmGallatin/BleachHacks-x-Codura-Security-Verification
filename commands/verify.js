const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify yourself to get access to the server'),

    async execute(interaction) {

        // Load config values from environment variables
        const verifyChannel = process.env.VERIFY_CHANNEL_ID;
        const memberRoleId = process.env.MEMBER_ROLE_ID;

        // Block if the user runs it in the wrong channel
        if (interaction.channelId !== verifyChannel) {
            return interaction.reply({
                content: "❌ You must use this command in the verification channel.",
                ephemeral: true
            });
        }

        // Load the banner image from assets folder
        const bannerPath = path.join(__dirname, '..', 'assets', 'verify-banner.jpeg');
        const banner = new AttachmentBuilder(bannerPath);

        // Give role
        const role = interaction.guild.roles.cache.get(memberRoleId);
        await interaction.member.roles.add(role).catch(() => {});

        // Send confirmation
        await interaction.reply({
            content: "✅ You are now verified!",
            files: [banner]
        });
    }
};
