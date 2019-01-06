import { Command, KlasaMessage } from 'klasa';

const INFO_MSG = `
Zero Two is a bot built for specifically for the AniTrend Community.
The bot is currently built using the Klasa framework, which is based on Discord.js.

For more info about the bot, ask Zero Two's Master, <@139360031102599168>.
`;

export default class InfoCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'info',
      description: '',
    });
  }

  async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
    return message.sendMessage(INFO_MSG);
  }
}
