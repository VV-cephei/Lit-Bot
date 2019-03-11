const minimist = require('minimist-string');
const commands = require('../commands.json');
const fs = require('fs');

module.exports = (client, msg) => {
  // Ignore all bots
  var curses = JSON.parse(fs.readFileSync('/var/Lit-Bot/curses.json'));
  let command
  let cmd
  let crs
  if (msg.author.bot) return;
  console.log('message received!')
  console.log(msg.author.id)
  // Ignore messages not starting with the prefix (in config.json)
  //if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  // const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  //const command = args.shift().toLowerCase();
  commands.filter(command => {
    command.triggers.filter(trigger => {
      if (minimist(msg.content.toLowerCase())._[0] == trigger && command.channels.indexOf(msg.channel.name) > -1) {
        console.log(command.name)
        command = command.name
        cmd = client.commands.get(command);
        if (!cmd) return;

        // Run the command
        cmd.run(client, msg);
      }
    })
  })

  // Grab the command data from the client.commands Enmap
 
  curses.filter(curse => {
    curse.cursed.filter(cursee => {
      if (cursee.name == '<@' + msg.author.id + '>') {
        console.log(msg.author.id + ' is cursed with ' + curse.name);
        crs = client.curses.get(curse.name);
        if (!crs) return;

        crs.run(client, msg);
      }
    })
  })
 

  // If that command doesn't exist, silently exit and do nothing
  
};
