const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete a number of messages from this channel')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete (1–100)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: '❌ Amount must be between **1–100**.', ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true).catch(() => null);

        const reply = await interaction.reply(`🧹 Deleted **${amount}** messages.`);

        // Auto delete bot reply after 3 seconds
        setTimeout(() => {
            reply.delete().catch(() => {});
        }, 3000);
    },
};
