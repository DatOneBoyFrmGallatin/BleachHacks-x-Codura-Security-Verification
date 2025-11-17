const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Start a giveaway')
        .addStringOption(option =>
            option.setName('prize')
                .setDescription('What is the prize?')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration in minutes')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        if (interaction.channel.id !== config.giveawayChannelId)
            return interaction.reply({ content: 'Use this in the giveaway channel.', ephemeral: true });

        const prize = interaction.options.getString('prize');
        const duration = interaction.options.getInteger('duration');

        const endTime = Date.now() + duration * 60_000;

        const message = await interaction.reply({
            content: `🎉 **Giveaway Started!**  
**Prize:** ${prize}  
React with 🎉 to enter!  
Ends in **${duration} minutes**`,
            fetchReply: true
        });

        await message.react('🎉');

        setTimeout(async () => {
            const fetched = await message.fetch();
            const reactions = fetched.reactions.cache.get('🎉');

            if (!reactions) return;

            const users = await reactions.users.fetch();
            const filtered = users.filter(u => !u.bot);

            if (filtered.size === 0) {
                return interaction.followUp('No valid entries. Giveaway canceled.');
            }

            const winner = filtered.random();

            interaction.followUp(`🎉 **Winner:** <@${winner.id}>  
**Prize:** ${prize}`);
        }, duration * 60_000);
    },
};
