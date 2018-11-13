import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class TestCommand extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string, options: CommandOptions) {
    super(client, store, file, directory, {
      name: 'test',
      usage: '',
      usageDelim: ' '
    });
  }

  run(message: KlasaMessage) {
    message.send('!add 1 1');
    return message.send('!h');
  }
}
