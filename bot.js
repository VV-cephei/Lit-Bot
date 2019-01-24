const fs = require('fs')
const Discord = require('discord.js');
const minimist = require('minimist-string');
const auth = require('./auth.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Adding event ${eventName}`)
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./cmds/", (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./cmds/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});


// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.username}!`)
//   client.user.setActivity("with my books")
// });

// client.on('message', msg => {
//   if (message.author.bot) return;
//   commands.filter(command => {
//     command.triggers.filter(trigger => {
//       if (minimist(msg.content.toLowerCase())._[0] == trigger && command.channels.indexOf(msg.channel.name) > -1) {
//         console.log('COMMAND YOU')
//         var subCommand = require(command.path)
//         msg.channel.send(subCommand(msg.content))
//       }
//     })
//   })
// });

client.login(auth.token);