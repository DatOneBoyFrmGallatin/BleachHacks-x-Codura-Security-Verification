const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kick')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: 'User is not in this server.', ephemeral: true });
        }

        await member.kick(reason);

        await interaction.reply(`👢 **${user.tag}** has been kicked.\nReason: **${reason}**`);

        const logChannel = interaction.guild.channels.cache.get(config.logChannelId);
        if (logChannel) {
            logChannel.send(`👢 **KICK**  
**User:** ${user.tag}  
**By:** ${interaction.user.tag}  
**Reason:** ${reason}`);
        }
    },
};
