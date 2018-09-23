var Discord = require('discord.io');
var fs = require('fs');
const auth = require('./auth.json');

fs.readFile('./Full Text - Timestamps - Neutral Names.txt', "utf16le", function (err, data) {
	if (err) {
		throw err; 
	}
	var lineQuotes = data.split(/\n(?=\w*\s{0,1}\w*:)/);
	console.log(lineQuotes[Math.floor(Math.random() * lineQuotes.length)]);
});


var bot = new Discord.Client({
    autorun: true,
    token: auth.token
});

console.log('test');

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
	console.log('message recieved');
	message = message.toLowerCase();

	if (message.split(/\s/)[0].charAt(0) == "!") {

		switch (message.split(/\s/)[0].substring(1)) {
	    	case "quote":
	        	console.log("quote commad");

	        	switch(message.split(/\s/).length) {
	        		case 1:
	        			fs.readFile('./Full Text - Timestamps - Neutral Names.txt', "utf16le", function (err, data) {
							if (err) {
								throw err; 
							}
							var lineQuotes = data.split(/\n(?=\w*\s{0,1}\w*:)/);
							console.log(lineQuotes.length);
							var postId = Math.floor(Math.random() * lineQuotes.length);
							var discordMessage = "(Post# " + postId + ")" + lineQuotes[postId];
							console.log(discordMessage);
							bot.sendMessage({
				            	to: channelID,
				            	message: discordMessage
				        	});
						});
	        			break;
	        		case 2:
	        			console.log('2');
	        			switch(message.split(/\s/)[1]) {
        				case "-context":
        					fs.readFile('./Full Text - Timestamps - Neutral Names.txt', "utf16le", function (err, data) {
								if (err) {
									throw err; 
								}
								var lineQuotes = data.split(/\n(?=\w*\s{0,1}\w*:)/);
								console.log(lineQuotes.length);
								var postId = Math.floor(Math.random() * lineQuotes.length);
								var discordMessage = "";
								for (var i = -5; i <= 5; i++) {
									console.log(i);
								    discordMessage += "(Post# " + (postId + i) + ")" + lineQuotes[postId + i] + "\n";
								};
								console.log(discordMessage);
								bot.sendMessage({
					            	to: channelID,
					            	message: discordMessage
					        	});
							});
        					break;
        				default:
        					console.log('Invalid Command');
        				}
	        			break;
	        		case 3:
	        			switch(message.split(/\s/)[1]) {
	        				case "-id":
	        					fs.readFile('./Full Text - Timestamps - Neutral Names.txt', "utf16le", function (err, data) {
									if (err) {
										throw err; 
									}
									var lineQuotes = data.split(/\n(?=\w*\s{0,1}\w*:)/);
									console.log(lineQuotes.length);
									var postId = message.split(/\s/)[2];
									var discordMessage = "(Post# " + postId + ")" + lineQuotes[postId];
									console.log(discordMessage);
									bot.sendMessage({
						            	to: channelID,
						            	message: discordMessage
						        	});
								});
	        					break;
	        				case "-name":
	        					fs.readFile('./Full Text - Timestamps - Neutral Names.txt', "utf16le", function (err, data) {
									if (err) {
										throw err; 
									}
									var regexString = "\\n(?=" + message.split(/\s/)[2] + "\\s*\\w*:)";
									var re = new RegExp(regexString,'gi');
									var lineQuotes = data.split(re);
									var postId = Math.floor(Math.random() * lineQuotes.length);
									var re = new RegExp('\\n(?=\\w*\\s{0,1}\\w*:)','g');
									var discordMessage = "(Post# " + postId + ")" + lineQuotes[postId].split(re)[0];
									console.log(discordMessage);
									bot.sendMessage({
						            	to: channelID,
						            	message: discordMessage
						        	});
								});
	        					break;
	        				default:
	        					console.log('Invalid Command');
	        			}
	        			break;
	        		default:
	        			console.log('Invalid Command')
	       		}

	        	break; 
	        case "help":
	        	fs.readFile('./help.txt', "utf8", function (err, data) {
					if (err) {
						throw err; 
					}
					var discordMessage = data;
					console.log(discordMessage);
					bot.sendMessage({
		            	to: channelID,
		            	message: discordMessage
		        	});
				});
	        	break;
	    	default: 
	        	console.log("Invalid Command");
		}
	}

	/*
    if (message === "!quote") {
    	fs.readFile('./Full Text - Timestamps - Neutral Names.txt', "utf16le", function (err, data) {
			if (err) {
				throw err; 
			}
			var lineQuotes = data.split(/\n(?=\w*\s{0,1}\w*:)/);
			console.log(lineQuotes.length);
			var postId = Math.floor(Math.random() * lineQuotes.length);
			var discordMessage = "(Post# " + postId + ")" + lineQuotes[postId];
			console.log(discordMessage);
			bot.sendMessage({
            	to: channelID,
            	message: discordMessage
        	});
		});
    };*/
});