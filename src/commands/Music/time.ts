import { MusicCommand } from '../../lib/structures/MusicCommand';
import { showSeconds } from '../../utils/common';

export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, { description: 'Check how much time is left for the song to end.' });
  }

  async run(msg) {
    const { playing, remaining } = msg.guild.music;
    if (!playing) throw `Are you speaking to me? Because my deck is empty...`;
    return msg.sendMessage(`🕰 Time remaining: ${showSeconds(remaining)}`);
  }

}
