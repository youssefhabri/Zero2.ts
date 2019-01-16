import { Command, KlasaMessage } from 'klasa';


export default class Cleanup extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'cleanup',
      runIn: ['text'],
      permissionLevel: 6,
      usage: '[messages:number]',
    });
  }

  async run(message, params) {
    const limit = parseInt(params[0]) || 5;

    message.delete();

    return message
      .prompt(`Do you really want to delete the last ${limit} message(s)?`)
      .then((reply: KlasaMessage) => {
        const response = reply.cleanContent;

        reply.delete();

        if (response.localeCompare('yes')) {
          reply.channel.messages.fetch({ limit, before: message.id })
            .then((collection) =>
              collection.each((message: KlasaMessage) => {
                return message.delete();
              }),
            );
        }
      });
  }
}
