var message = "!quote --id 49720 --context"
const minimist = require('minimist-string')
var commands = require('./commands.json')

//console.log(commands);

commands.filter(command => {
  command.triggers.filter(trigger => {
    if (minimist(message.toLowerCase())._[0] == trigger) {
      console.log(command.name)
      var subCommand = require(command.path)
      subCommand(message)
    } else {
      
    }
  })
})