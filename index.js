const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits,SlashCommandBuilder } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});	
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;

	console.log(interaction);
});

client.on('ready', () => {
    console.log('je suis co')
})

client.on('messageCreate', async message => {
if (message.content.startsWith("POID")) {
message.channel.send("FF"); 
console.log('commende ex');
}
});


client.login('MTAzMTI0MDExNTU5MjM2NDAzMg.GX4vwW.S2h-BFNgLHqFpPt-CE3oYDbDZ2rbs3I4XhijL8');