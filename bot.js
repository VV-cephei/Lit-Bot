var Discord = require('discord.io');
var minimist = require('minimist-string');
const auth = require('./auth.json');
var quote = require('./quote.js');

var bot = new Discord.Client({
    autorun: true,
    token: auth.token
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
	console.log('message recieved');
	parseMessage = minimist(message.toLowerCase());
	if ('!quote'.includes(parseMessage._[0])) {
		var discordMessage = quote(message);
		bot.sendMessage({
        	to: channelID,
        	message: discordMessage
    	});
	}
});
