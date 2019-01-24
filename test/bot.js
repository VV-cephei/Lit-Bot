const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('../auth.json');
const commands = require('./commands.json')
const minimist = require('minimist-string');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
  client.user.setActivity("with my books")
});

client.on('message', msg => {
  commands.filter(command => {
    command.triggers.filter(trigger => {
      if (minimist(msg.content.toLowerCase())._[0] == trigger && command.channels.indexOf(msg.channel.name) > -1) {
        console.log('COMMAND YOU')
        var subCommand = require(command.path)
        msg.channel.send(subCommand(msg.content))
      }
    })
  })
});

client.login(auth.token);

/*
Message {
  channel:
   TextChannel {
     type: 'text',
     deleted: false,
     id: '485446956814958602',
     name: 'the-pink-fields',
     position: 2,
     parentID: null,
     permissionOverwrites: Collection [Map] {},
     topic: null,
     nsfw: false,
     lastMessageID: '531322250922819624',
     guild:
      Guild {
        members: [Collection],
        channels: [Collection],
        roles: [Collection],
        presences: [Collection],
        deleted: false,
        available: true,
        id: '251176945750900746',
        name: 'Literature General',
        icon: 'e270056f9072a87dee638d39be53415b',
        splash: null,
        region: 'us-east',
        memberCount: 21,
        large: false,
        features: [],
        applicationID: null,
        afkTimeout: 300,
        afkChannelID: null,
        systemChannelID: null,
        embedEnabled: undefined,
        verificationLevel: 0,
        explicitContentFilter: 0,
        mfaLevel: 0,
        joinedTimestamp: 1537496717592,
        defaultMessageNotifications: 'ALL',
        ownerID: '213843356743237632',
        _rawVoiceStates: Collection [Map] {},
        emojis: [Collection] },
     messages: Collection [Map] { '531322250922819624' => [Circular] },
     _typing: Map { '283993309024747520' => [TypingData] },
     lastMessage: [Circular] },
  deleted: false,
  id: '531322250922819624',
  type: 'DEFAULT',
  content: 'q',
  author:
   User {
     id: '283993309024747520',
     username: 'char_null',
     discriminator: '6576',
     avatar: '3270dd338b1d470f80844d814de828d4',
     bot: false,
     lastMessageID: '531322250922819624',
     lastMessage: [Circular] },
  member:
   GuildMember {
     guild:
      Guild {
        members: [Collection],
        channels: [Collection],
        roles: [Collection],
        presences: [Collection],
        deleted: false,
        available: true,
        id: '251176945750900746',
        name: 'Literature General',
        icon: 'e270056f9072a87dee638d39be53415b',
        splash: null,
        region: 'us-east',
        memberCount: 21,
        large: false,
        features: [],
        applicationID: null,
        afkTimeout: 300,
        afkChannelID: null,
        systemChannelID: null,
        embedEnabled: undefined,
        verificationLevel: 0,
        explicitContentFilter: 0,
        mfaLevel: 0,
        joinedTimestamp: 1537496717592,
        defaultMessageNotifications: 'ALL',
        ownerID: '213843356743237632',
        _rawVoiceStates: Collection [Map] {},
        emojis: [Collection] },
     user:
      User {
        id: '283993309024747520',
        username: 'char_null',
        discriminator: '6576',
        avatar: '3270dd338b1d470f80844d814de828d4',
        bot: false,
        lastMessageID: '531322250922819624',
        lastMessage: [Circular] },
     joinedTimestamp: 1515803795339,
     _roles: [ '499215119495200788' ],
     serverDeaf: false,
     serverMute: false,
     selfMute: undefined,
     selfDeaf: undefined,
     voiceSessionID: undefined,
     voiceChannelID: undefined,
     speaking: false,
     nickname: null,
     lastMessageID: '531322250922819624',
     lastMessage: [Circular],
     deleted: false },
  pinned: false,
  tts: false,
  nonce: '531322269905977344',
  system: false,
  embeds: [],
  attachments: Collection [Map] {},
  createdTimestamp: 1546747496110,
  editedTimestamp: null,
  reactions: Collection [Map] {},
  mentions:
   MessageMentions {
     everyone: false,
     users: Collection [Map] {},
     roles: Collection [Map] {},
     _content: 'q',
     _client:
      Client {
        _events: [Object],
        _eventsCount: 4,
        _maxListeners: 10,
        options: [Object],
        rest: [RESTManager],
        dataManager: [ClientDataManager],
        manager: [ClientManager],
        ws: [WebSocketManager],
        resolver: [ClientDataResolver],
        actions: [ActionsManager],
        voice: [ClientVoiceManager],
        shard: null,
        users: [Collection],
        guilds: [Collection],
        channels: [Collection],
        presences: Collection [Map] {},
        user: [ClientUser],
        readyAt: 2019-01-06T04:04:51.198Z,
        broadcasts: [],
        pings: [Array],
        _timeouts: [Set],
        _intervals: [Set] },
     _guild:
      Guild {
        members: [Collection],
        channels: [Collection],
        roles: [Collection],
        presences: [Collection],
        deleted: false,
        available: true,
        id: '251176945750900746',
        name: 'Literature General',
        icon: 'e270056f9072a87dee638d39be53415b',
        splash: null,
        region: 'us-east',
        memberCount: 21,
        large: false,
        features: [],
        applicationID: null,
        afkTimeout: 300,
        afkChannelID: null,
        systemChannelID: null,
        embedEnabled: undefined,
        verificationLevel: 0,
        explicitContentFilter: 0,
        mfaLevel: 0,
        joinedTimestamp: 1537496717592,
        defaultMessageNotifications: 'ALL',
        ownerID: '213843356743237632',
        _rawVoiceStates: Collection [Map] {},
        emojis: [Collection] },
     _members: null,
     _channels: null },
  webhookID: null,
  hit: null,
  _edits: [] }
  */