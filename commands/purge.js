const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete a number of recent messages')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('How many messages to delete (1–100)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 100) {
            return interaction.reply({
                content: '❌ Amount must be between **1** and **100**.',
                ephemeral: true
            });
        }

        await interaction.channel.bulkDelete(amount, true).catch(() => {
            return interaction.reply({
                content: '❌ Could not delete messages in this channel.',
                ephemeral: true
            });
        });

        interaction.reply(`🧹 Deleted **${amount}** messages.`);
    }
};
