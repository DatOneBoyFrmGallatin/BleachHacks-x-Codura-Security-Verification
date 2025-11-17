const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for ban')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);
        if (!member) {
            return interaction.reply({ content: 'User is not in the server.', ephemeral: true });
        }

        await member.ban({ reason });

        await interaction.reply(`🔨 **${user.tag}** has been banned.\nReason: **${reason}**`);

        const logChannel = interaction.guild.channels.cache.get(config.logChannelId);
        if (logChannel) {
            logChannel.send(`🔨 **BAN**  
**User:** ${user.tag}  
**By:** ${interaction.user.tag}  
**Reason:** ${reason}`);
        }
    },
};
