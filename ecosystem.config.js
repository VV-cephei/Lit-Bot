module.exports = {
  apps : [{
    name        : "worker",
    script      : "./bot.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}