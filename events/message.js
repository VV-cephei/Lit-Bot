const minimist = require('minimist-string');
const commands = require('../commands.json')

module.exports = (client, msg) => {
  // Ignore all bots
  let command
  let cmd
  if (msg.author.bot) return;
  console.log('message received!')
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
  
  console.log(cmd)

  // If that command doesn't exist, silently exit and do nothing
  
};