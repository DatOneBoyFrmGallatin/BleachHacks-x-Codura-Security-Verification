const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set slowmode for the current channel.')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Number of seconds for slowmode (0 to disable).')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');

        if (seconds < 0 || seconds > 21600) {
            return interaction.reply({ 
                content: '❌ Slowmode must be between **0–21600 seconds** (6 hours).', 
                ephemeral: true 
            });
        }

        await interaction.channel.setRateLimitPerUser(seconds);

        interaction.reply(`⏳ Slowmode updated to **${seconds} seconds**.`);
    },
};
