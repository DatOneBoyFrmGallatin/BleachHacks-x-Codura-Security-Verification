const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Start a simple giveaway')
        .addStringOption(option =>
            option.setName('prize')
                .setDescription('Prize for the giveaway')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents),

    async execute(interaction) {
        const prize = interaction.options.getString('prize');

        const message = await interaction.reply({
            content: `🎉 **GIVEAWAY STARTED!** 🎉\n\nPrize: **${prize}**\nReact with 🎉 to enter!`,
            fetchReply: true
        });

        await message.react('🎉');
    }
};
