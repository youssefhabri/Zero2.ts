import { KlasaClient } from 'klasa';

// Loading environment variables from .env file
require('dotenv').config();

const prefix = process.env.BOT_PREFIX || 'd!';

class Zero2Bot extends KlasaClient {

  constructor() {
    super({
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
    });
  }

}

new Zero2Bot().login(process.env.BOT_TOKEN);
