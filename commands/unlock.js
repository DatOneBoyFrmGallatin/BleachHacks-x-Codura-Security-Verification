const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlocks the current channel so everyone can send messages again.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.channel;

        await channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            { SendMessages: true }
        );

        interaction.reply(`🔓 This channel has been **unlocked**.`);
    },
};
