const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Locks the current channel so no one can send messages.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.channel;

        await channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            { SendMessages: false }
        );

        interaction.reply(`🔒 This channel has been **locked**.`);
    },
};
