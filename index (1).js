const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const config = require('./config');

if (!config.TOKEN) {
    console.error("❌ ERROR: TOKEN is missing.");
    process.exit(1);
}
if (!config.CLIENT_ID) {
    console.error("❌ ERROR: CLIENT_ID is missing.");
    process.exit(1);
}
if (!config.GUILD_ID) {
    console.error("❌ ERROR: GUILD_ID is missing.");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        console.log(`⚠️ Skipped ${file}: Missing "data" or "execute"`);
    }
}

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

(async () => {
    try {
        console.log("🔁 Refreshing slash commands...");
        await rest.put(
            Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
            { body: commands }
        );
        console.log("✅ Commands registered!");
    } catch (error) {
        console.error("❌ Slash command error:", error);
    }
})();

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return interaction.reply({ content: "❌ Command not found.", ephemeral: true });
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "❌ Error executing command.", ephemeral: true });
    }
});

client.login(config.TOKEN);
