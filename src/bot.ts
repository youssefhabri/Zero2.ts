import { KlasaClient } from 'klasa';

// Loading environment variables from .env file
require('dotenv').config();

const prefix = process.env.BOT_PREFIX || 'd!';

new KlasaClient({
  ownerID: process.env.BOT_OWNER_ID,
  fetchAllMembers: false,
  prefix: prefix,
  commandEditing: false,
  disabledCorePieces: [],
  typing: true,
  providers: {},
  readyMessage: (client) =>
    `Successfully initialized. Ready to serve ${
      client.guilds.size
      } guilds. Prefix: ${prefix}`,
}).login(process.env.BOT_TOKEN);
