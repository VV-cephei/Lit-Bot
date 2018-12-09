var fs = require('fs');
var minimist = require('minimist-string');

function quote(command) {
	var argv = minimist(command);
	var data = fs.readFileSync('./Full Text - Timestamps - Neutral Names.txt', "utf16le")
	console.log('in quote command');
	var quoteName = (argv.name === undefined) ? "" : argv.name;
	var regexString = "\\n(?=" + quoteName + "\\w*\\s{0,2}\\w*:)";
	var re = new RegExp(regexString,'gi');
	var allQuotes = data.split(re);
	var postId = (argv.id === undefined) ? Math.floor(Math.random() * allQuotes.length) : argv.id;
	regexString = "\\n(?=\\w*\\s{0,2}\\w*:)";
	re = new RegExp(regexString,'gi');

	if (argv.context != undefined) {
		var message = '';
		for (var i = -5; i <= 5; i++) {
			try {
				quote = allQuotes[postId + i].split(re);
			}
			catch (err) {
				message = "";
			}
			message += "(Post# " + (postId + i) + ")" + quote[0] + "\n";
		}
		console.log(message);
		return(message);
	} else {
		try {
			quote = allQuotes[postId].split(re);
		}
		catch (err) {
			//console.log(err);
			return "";
		}
		console.log(quote[0]);
		return("(Post# " + postId + ")" + quote[0]);
	};

};

module.exports = quote;
