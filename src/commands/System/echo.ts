import { Command } from 'klasa';


export default class extends Command {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      aliases: ['talk'],
      description: 'Make Sneyra talk in another channel.',
      permissionLevel: 10,
      usage: '[channel:channel] [message:string] [...]',
      usageDelim: ' ',
    });
  }

  async run(msg, [channel = msg.channel, ...content]) {
    if (msg.deletable) msg.delete().catch(() => undefined);

    const attachment = msg.attachments.size > 0 ? msg.attachments.first().url : undefined;
    const replyContent = content.length ? content.join(' ') : '';

    if (replyContent.length === 0 && !attachment) throw 'I have no replyContent nor attachment to send, please write something.';

    const options = {
      files: [],
    };
    if (attachment) options.files = [{ attachment }];

    return channel.send(replyContent, options);
  }

};
