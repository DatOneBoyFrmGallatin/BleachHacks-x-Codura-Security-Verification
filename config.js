module.exports = {
token: process.env TOKEN,
  clientId:'YOUR_APPLICATION_ID'
    guildId: 'YOUR_SERVER_ID'
  verifyChannelId: process.env.VERIFY_CHANNEL_ID,
  memberRoleId: process.env.MEMBER_ROLE_ID,
  logsChannelId: process.env.LOG_CHANNEL_ID,
  giveawayChannelId: process.env.GIVEAWAY_CHANNEL_ID,
  adminRoleId: process.env.ADMIN_ROLE_ID,
  modRoleId: process.env.MOD_ROLE_ID || process.env.ADMIN_ROLE_ID
};
