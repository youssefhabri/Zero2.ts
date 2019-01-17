import { MusicCommand } from '../../lib/structures/MusicCommand';
import { showSeconds } from '../../utils/common';


export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, { description: 'Check the queue list.' });
  }

  async run(msg) {
    const { next, queue, autoplay } = msg.guild.music;
    const output = [];
    for (let i = 0; i < Math.min(queue.length, 10); i++) {
      output[i] = [
        `[__\`${String(i + 1).padStart(2, '')}\`__] *${queue[i].title.replace(/\*/g, '\\*')}* requested by **${queue[i].requester.tag || queue[i].requester}**`,
        `   └── <https://youtu.be/${queue[i].url}> (${showSeconds(queue[i].seconds * 1000)})`,
      ].join('\n');
    }
    if (queue.length > 10) output.push(`\nShowing 10 songs of ${queue.length}`);
    else if (autoplay) output.push(`\n**AutoPlay**: <${next}>`);

    return msg.sendMessage(output.join('\n'));
  }

}
