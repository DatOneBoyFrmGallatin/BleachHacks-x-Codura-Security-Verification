const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removetimeout')
        .setDescription('Remove a timeout from a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to remove timeout from')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);
        if (!member) {
            return interaction.reply({ content: '❌ Could not find that user.', ephemeral: true });
        }

        await member.timeout(null).catch(() => {
            return interaction.reply({ content: '❌ Failed to remove timeout.', ephemeral: true });
        });

        interaction.reply(`🔓 Timeout removed from **${user.tag}**.`);
    }
};
