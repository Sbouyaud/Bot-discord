const Discord = require('discord.js')

const bot = new Discord.Client()

var Twitter = require('twitter')
var twitter = new Twitter({
  consumer_key: 'XGlxLzZBMy2Xw0B4gMKrEMwHx',
  consumer_secret: 'BaSZp19yChLPIxgt5Wzg9G0R3KxKflufOWHCdWNqg7DzHJZbUX',
  access_token_key: '859670215029862400-BmYzgPwl3wsrQAtWTVtY88m2YrPOke4',
  access_token_secret: 'N7YjLCKy3eoTLczPw1793SWpKcTifwhA7xauoAWR4vrfo',
})
bot.on('ready', () => {
  console.log('Steins prête!')
})
bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
})
bot.login('MzExOTExMDI2MzE0NDQ0ODAx.C_dmew.xYOZfnCwxl_VfBnE08v2RkEVjpI')

bot.on('message', function (message) {
  liste = message.content.split(' ')

  const action = liste[0];
  const channel = liste[1] || '#Paris';

  if (action === 'ecoute') {
    message.channel.send(`Ecoute des tweets sur ${channel}`)

    twitter.stream('statuses/filter', { track: channel },
      function (stream) {
        stream.on('data', function (tweet) {
          message.channel.send(`https://twitter.com/${tweet.user.id}/status/${tweet.id}`)
        })
        stream.on('error', function (error) {
          console.error(error)
        })

      })
  }
})

bot.on('message', message => {

  if (message.content.startsWith('!play')) {
    let voiceChannel = message.guild.channels
      .filter(function (channel) { return channel.type === 'voice' })
      .first()
    let args = message.content.split(' ')
    voiceChannel
      .join()
      .then(function (connection) {
        let stream = YoutubeStream(args[1])
        stream.on('error', function () {
          message.reply("Je n'ai pas réussi à lire cette vidéo :(")
          connection.disconnect()
        })
        connection
          .playStream(stream)
          .on('end', function () {
            connection.disconnect()
          })
      })
  }

})