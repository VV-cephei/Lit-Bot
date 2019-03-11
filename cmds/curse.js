var fs = require('fs');
var minimist = require('minimist-string');

function curse(client, msg) {
  var argv = minimist(msg.content);
  var curses = JSON.parse(fs.readFileSync('/var/Lit-Bot/curses.json'));
  console.log('curse command running');
  var who = argv.who;
  var of = argv.of;

  curses.filter(curse => {
    if(curse.name == of) {
      var subject
      console.log(of)
      console.log(who)
      console.log(curse.cursed);

      curse.cursed.filter(cursee => {
        if(who == cursee.name) {
          console.log('found');
        } else {
          subject = 
          {
            "name": who,
            "count": 0
          }
        }
      });

      curse.cursed.push(subject);
      if(argv.purge) {
        curse.cursed = [{"name":"","count":0}];
      };
      if(argv.lift) {
        
      }
      console.log(curse.cursed);
    }
  })

  fs.writeFileSync('/var/Lit-Bot/curses.json', JSON.stringify(curses), 'utf-8');
};

module.exports.run = curse;
