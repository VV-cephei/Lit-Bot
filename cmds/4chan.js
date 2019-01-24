const http = require('http');
var request = require('request')
var minimist = require('minimist-string');
var message = "!4chan --board asp"



function fourChan(client, msg) {
  var argv = minimist(msg.content)
  var threads = []
  var boards = ["asp", "v", "a", "c", "co", "ck", "tv"]
  var board = (argv.board === undefined) ? boards[Math.floor(Math.random() * boards.length)] : argv.board
  console.log(board)
  return http.get({
    hostname: 'a.4cdn.org',
    path: '/' + board + '/threads.json',
    agent: false  // create a new agent just for this one request
  }, (res) => {
    res.on("data", function(chunk) {
      JSON.parse(chunk).filter(page => {
        page.threads.filter(thread => {
          threads.push(thread.no)
        })
      })
      
      var randThread = threads[Math.floor(Math.random() * threads.length)];
      
      http.get({
        hostname: 'a.4cdn.org',
        path: '/' + board + '/thread/' + randThread + '.json',  
        agent: false  // create a new agent just for this one request
      }, (res) => {
        var body = ""
        var imagePosts = []
        res.on("data", function(chunk) {
          console.log('in thread')
          body += chunk
        })
        
        res.on("end", function() {
          JSON.parse(body).posts.filter(post => {
            if (post.tim !== undefined) {
              imagePosts.push(post)
            }
          })
          //console.log(imagePosts)
          var randImagePost= imagePosts[Math.floor(Math.random() * imagePosts.length)];
          console.log(randImagePost)
          msg.channel.send("http://i.4cdn.org/" + board + "/" + randImagePost.tim + randImagePost.ext)
        })
      })
      
    })
  })
}

module.exports.run = fourChan;