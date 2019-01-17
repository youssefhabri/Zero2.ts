require('module-alias/register');

// Loading environment variables from .env file
require('dotenv').config();

import { Client, KlasaClient } from 'klasa';

// Load custom structures for Sneyra Music Commands
require('./lib/extensions/SneyraGuild');

// Modify the permission levels
Client.defaultPermissionLevels
// @ts-ignore
  .add(5, (msg) => msg.member && msg.guild.settings.dj && msg.member.roles.has(msg.guild.settings.dj), { fetch: true })
  .add(6, (msg) => msg.member
    // @ts-ignore
    && ((msg.guild.settings.administrator && msg.member.roles.has(msg.guild.settings.administrator))
      || msg.member.permissions.has('MANAGE_GUILD')), { fetch: true });

const prefix = process.env.BOT_PREFIX || 'd!';
const prefix_regex = process.env.BOT_PREFIX_REGEX || '';

class Zero2Bot extends KlasaClient {
  constructor() {
    super({
      ownerID: process.env.BOT_OWNER_ID,
      fetchAllMembers: false,
      prefix: prefix,
      regexPrefix: new RegExp(prefix_regex, 'i'),
      commandEditing: true,
      console: { useColor: true, utc: true },
      pieceDefaults: { commands: { deletable: true, promptLimit: 5, quotedStringSupport: true } },
      presence: { activity: { name: '2!help', type: 'LISTENING' } },
      disabledCorePieces: [],
      typing: true,
      providers: {
        // default: 'firestore',
        // firestore: {
        //   credentials: firebaseConfig,
        //   databaseURL: process.env.FIREBASE_DB_URL,
        // },
      },
      readyMessage: (client) =>
        `Successfully initialized. Ready to serve ${
          client.guilds.size
          } guilds. Prefix: ${client.options.prefix}`,
    });
  }
}

new Zero2Bot().login(process.env.BOT_TOKEN);
