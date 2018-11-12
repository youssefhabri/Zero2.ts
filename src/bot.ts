import { Client } from 'klasa';

// Loading envirement varianles from .env file
require('dotenv').config();

const prefix = process.env.BOT_PREFIX || 'd!';

new Client({
  ownerID: process.env.BOT_OWNER_ID,
  fetchAllMembers: false,
  prefix: prefix,
  commandEditing: false,
  disabledCorePieces: [],
  typing: true,
  readyMessage: (client) =>
    `Successfully initialized. Ready to serve ${
      client.guilds.size
    } guilds. Prefix: ${prefix}`,
}).login(process.env.BOT_TOKEN);
