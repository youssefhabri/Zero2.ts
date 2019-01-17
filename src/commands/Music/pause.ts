import { MusicCommand } from '../../lib/structures/MusicCommand';


export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      description: 'Pauses the current song.',
      requireMusic: true,
    });
  }

  async run(msg) {
    const { music } = msg.guild;
    if (!music.playing) throw 'I am not playing anything...';

    music.pause();
    return msg.sendMessage('⏸ Paused');
  }

}
