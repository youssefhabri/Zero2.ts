import { MusicCommand } from '../../Sneyra';


export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      description: 'Leaves the voice channel.',
      requireMusic: true,
    });
  }

  async run(msg) {
    await msg.guild.music.leave();
    return msg.sendMessage(`Successfully left the voice channel ${msg.guild.me.voice.channel}`);
  }

}
