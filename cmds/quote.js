var fs = require('fs');
var minimist = require('minimist-string');

function quote(client, msg) {
  console.log(msg.content)
	var argv = minimist(msg.content);
	var data = fs.readFileSync('/var/Lit-Bot/Full Text - Timestamps - Neutral Names.txt', "utf16le")
	//var data = fs.readFileSync('Full Text - Timestamps - Neutral Names.txt', "utf16le")
	console.log('in quote command');
	var quoteName = (argv.name === undefined) ? "" : argv.name;
	var regexString = "\\n(?=" + quoteName + "\\w*\\s{0,2}\\w*:)";
	//var regexString = "\\n(?=\\W*\\w*)*?:(\\W*\\w*)*?:\\d*\\s*\\w*\\W*" + quoteName + "\\w*\\s{0,2}\\w*:)";
	var re = new RegExp(regexString,'gi');
	var allQuotes = data.split(re);
	var postId = (argv.id === undefined) ? Math.floor(Math.random() * allQuotes.length) : argv.id;
	var searchArr = [];
	var searchArrId = [];
	var searchCount = 0;
	regexString = "\\n(?=\\w*\\s{0,2}\\w*:)";
	re = new RegExp(regexString,'gi');

	if (argv.context !== undefined) {
		var message = '';
		for (var i = -5; i <= 5; i++) {
			try {
				quote = allQuotes[postId + i].split(re);
			}
			catch (err) {
				console.log(err);
				message = "";
			}
			message += "(Post# " + (postId + i) + ")" + quote[0] + "\n";
		}
		console.log(message);
		msg.channel.send(message);
	} else if (argv.search != undefined) {
		var message = '';
		for (var i = 0; i < allQuotes.length; i++) {
			var doesHave = allQuotes[i].search(argv.search);
			if (doesHave != -1) {
				searchCount += 1;
				searchArr.push(allQuotes[i]);
				searchArrId.push(i);
			}
		}
		postId = (argv.id === undefined) ? Math.floor(Math.random() * searchArr.length) : argv.id - 1;
		console.log("done");
		message += "The word " + argv.search + " appeared " + searchCount + " times" + "\n" + "(Post# " + (searchArrId[postId]) + ")" + searchArr[postId];
		msg.channel.send(message);
	} else {
		try {
			quote = allQuotes[postId].split(re);
		}
		catch (err) {
			console.log(err);
			return "";
		}
		console.log(quote[0]);
		msg.channel.send("(Post# " + postId + ")" + quote[0]);
	};

};

module.exports.run = quote;
