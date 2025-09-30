const { Client, GatewayIntentBits } = require("discord.js");
const keep_alive = require('./keep_alive.js');

const TOKEN = process.env.DiscordToken;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
	if (msg.author.bot) return;
	
	if (!["1390208355867295916","1419532992212111420"].includes(msg.channel.id)) return;
	
	if (msg.content.includes("**Output Log**")) {
		console.log("Good");
	} else {
		msg.delete().catch(err => {
			if (err.code === 50013) {
				console.log("Bot has no permission to delete this message.");
			} else if (err.code === 10008) {
				console.log("Message already deleted.");
			} else {
				console.log(`Error deleting message: ${err}`);
			}
		});
	}
});

client.login(TOKEN);
